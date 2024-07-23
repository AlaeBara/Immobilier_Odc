const bcrypt = require('bcrypt');
const { Users } = require("../../Models/Users");
const jwt = require("jsonwebtoken");

const generateToken = (email, secretKey) => 
    jwt.sign({ email }, secretKey, { expiresIn: "1h" });

const Authentification = (secretKey) => async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Users.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ 
                status: "failure", 
                message: "Incorrect authentication information." 
            });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

        // If passwords don't match, return failure
        if (!match) {
            return res.status(400).json({ 
                status: "failure", 
                message: "Incorrect authentication information." 
            });
        }

        // Generate token
        const token = generateToken(email, secretKey);

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        // Return success response
        return res.json({ 
            status: "success",  
            message: "Successful authentication" 
        });

    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ 
            status: "fail", 
            message: "Internal server error" 
        });
    }
};

module.exports = { Authentification };
