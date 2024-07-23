require('dotenv').config()
const express = require('express');
const router = express.Router();

const {EditeProfile,getProfile} =require('../Controllers/User/EditeProfile')
const {jwtMiddleware} =require('../Middelwares/jwt')



router.get('/Profile',jwtMiddleware(process.env.secretKey),getProfile)



module.exports = router;