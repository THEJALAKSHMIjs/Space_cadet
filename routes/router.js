//import express 
const express = require('express')
//import user controller
const usercontroller =  require('../Controller/userController')

//create instance router
const router = new express.Router()

//login
router.post('/login',usercontroller.login)


module.exports = router