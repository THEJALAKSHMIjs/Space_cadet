//import express 
const express = require('express')
//import user controller
const usercontroller =  require('../Controller/userController')

//create instance router
const router = new express.Router()

//REGISTER
router.post('/register',usercontroller.register)


module.exports = router