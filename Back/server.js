require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const router =require('./Router/Router')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));




app.use('/', router)



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000 // Increase to 30 seconds
})
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
});


// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});