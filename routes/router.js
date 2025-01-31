//import express 
const express = require('express')
//import user controller
const usercontroller =  require('../Controller/userController')
const waitlistController=  require('../Controller/waitlistController')
//create instance router
const router = new express.Router()

//REGISTER
router.post('/register',usercontroller.register)

router.post('/waitlist',waitlistController.addToWaitlist)

router.get('/stats', waitlistController.getWaitlistStats); 


module.exports = router