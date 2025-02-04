//import dotenv
require('dotenv').config()
//import express 
const express = require('express')
//import cors
const cors = require('cors')
//import router
const router = require('../routes/router')
//import connection
require('../connection')


//create server
const spacecadet = express()
//server using cors
spacecadet.use(cors())
//parse the data 
spacecadet.use(express.json())
//use router
spacecadet.use(router)

//set port
const PORT = 4000 || process.env.PORT

//listen port 
spacecadet.listen(PORT, () => {
    console.log(`server running successfully at port number ${PORT}`);

})

//get
// spacecadet.get('/' , (req , res)=>{
//     res.send('get request recieved')
// })
