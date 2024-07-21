const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // This allows the field to be unique only if it exists
    }
});

const Users = mongoose.model("User", userSchema);

module.exports = { Users };