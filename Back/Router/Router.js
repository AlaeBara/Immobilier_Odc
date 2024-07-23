require('dotenv').config()
const express = require('express');
const router = express.Router();

const {signUp}=require('../Controllers/Sign/Sign_up')
const {Authentification}=require('../Controllers/Sign/Sign_in')
const {googleAuth} =require('../Controllers/Sign/Outh')

const {jwtMiddleware}=require('../Middelwares/jwt')


//Sign Up:
router.post('/signUp',signUp);
//  Authentification:
router.post('/signIn',Authentification(process.env.secretKey));
// Sign with Google
router.post('/googleAuth', googleAuth(process.env.secretKey));


//check if user logged (protect routes)
router.post('/check_authenticateToken', jwtMiddleware(process.env.secretKey), (req, res) => {
    res.sendStatus(200);
});


//log out
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});



module.exports = router;