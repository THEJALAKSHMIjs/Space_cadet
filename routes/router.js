// Import Express 
const express = require('express');

// Import Controllers
const { login, forgotPassword, resetPassword, verifyOtp } = require('../Controller/userController');
const { addToWaitlist, getWaitlistStats } = require('../Controller/waitlistController');
//import express 
const express = require('express')
//import user controller
const usercontroller =  require('../Controller/userController')
const waitlistController=  require('../Controller/waitlistController')

const { getQuestions } = require('../Controller/questionController'); 
//create instance router
const router = new express.Router()

//login
router.post('/login',usercontroller.login)

router.post('/waitlist',waitlistController.addToWaitlist)

router.get('/stats', waitlistController.getWaitlistStats); 

router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',verifyOtp)
router.post('/reset-password',resetPassword)

router.get('/forgot_password',usercontroller.forgotPassword)

router.post('/resetpassword',usercontroller.resetPassword)
router.get('/questions', getQuestions); 




module.exports = router
