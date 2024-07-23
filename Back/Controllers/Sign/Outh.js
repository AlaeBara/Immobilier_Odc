require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const { Users } = require('../../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(
  process.env.ID_Client,
  process.env.Secret_Key,
  process.env.GOOGLE_REDIRECT_URI
);

const generateToken = (email, secretKey) => 
  jwt.sign({ email }, secretKey, { expiresIn: "1h" });

const googleAuth = (secretKey)=> async (req, res) => {
  const { code } = req.body;
  try {
    console.log("Code received from client:", code);

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    console.log("Token payload:", payload);


    const { sub, email, name, picture } = payload;

    let user = await Users.findOne({ googleId: sub });

    if (!user) {
      const hashedPassword = await bcrypt.hash('defaultPassword', 10); 
      user = new Users({
        username:name,
        email:email,
        password:hashedPassword,
        image:picture,
        googleId: sub,
      });
      await user.save();
    }

    // Generate token
    const token = generateToken(email, secretKey);

    // Set token as a cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    res.json({ status: 'success', message: 'Authentication successful', user });
  } catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(400).json({ status: 'error', message: 'Invalid token' });
  }
};

module.exports = { googleAuth };
