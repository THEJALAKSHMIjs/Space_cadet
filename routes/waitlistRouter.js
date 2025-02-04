//import express 
const express = require('express')
//import user controller
const waitlistController=  require('../Controller/waitlistController')

//create instance router
const router = new express.Router()

router.post('/waitlist',waitlistController.addToWaitlist)
const { getQuestions } = require('../Controller/questionController'); 
router.get('/questions', getQuestions); 