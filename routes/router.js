// Import Express 
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

router.get('/forgot_password',usercontroller.forgotPassword)

router.post('/resetpassword',usercontroller.resetPassword)
router.get('/questions', getQuestions); 



module.exports = router
