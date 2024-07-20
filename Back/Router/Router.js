const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const {signUp}=require('../Controllers/Sign/Sign_up')
const {Authentification}=require('../Controllers/Sign/Sign_in')
const {jwt}=require('../Middelwares/jwt')


const secretKey = crypto.randomBytes(32).toString('hex');


//Sign Up:
router.post('/signUp',signUp);
//  Authentification:
router.post('/signIn',Authentification(secretKey));



module.exports = router;