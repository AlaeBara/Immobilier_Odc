require('dotenv').config()
const express = require('express');
const router = express.Router();

const {EditeProfile,getProfile} =require('../Controllers/User/Profile')
const {jwtMiddleware} =require('../Middelwares/jwt')



router.get('/Profile',jwtMiddleware(process.env.secretKey),getProfile)
router.put('/EditeProfile',jwtMiddleware(process.env.secretKey),EditeProfile)



module.exports = router;