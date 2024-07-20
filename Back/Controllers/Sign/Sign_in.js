const bcrypt = require('bcrypt');
const { Users } = require("../../Models/Users");
const jwt = require("jsonwebtoken");

const generateToken = (email, secretKey) => 
    jwt.sign({ email }, secretKey, { expiresIn: "1h" });

const Authentification = (secretKey) => async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
        const match =await bcrypt.compare(password, user.password);

        if (!user || !match) {
            return res.status(400).json({ 
                status: "failure", 
                message: "Incorrect authentication information." 
            });
        }

        const token = generateToken(email, secretKey);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return res.json({ 
            status: "success",  
            message: "successful authentication" 
        });

    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ 
            status: "fail", 
            message: "internal server error" 
        });
    }
};

module.exports = { Authentification };