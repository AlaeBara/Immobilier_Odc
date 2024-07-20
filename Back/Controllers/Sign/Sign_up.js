const bcrypt = require('bcrypt');
const { Users } = require("../../Models/Users");


const signUp = async (req, res) => {
    try {
        const { username,email, password} = req.body;

        const checkEmail = await Users.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ status: "failure", message: "This email is already associated with an account." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({ username,email, password: hashedPassword,image:"not yet"});
        await newUser.save();

        return res.json({ status: "success", message: "successful registration" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ status: "fail", message: "internal server error" });
    }
};


module.exports = { signUp };
