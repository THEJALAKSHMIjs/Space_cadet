const users = require("../models/userModel");

const jwt = require('jsonwebtoken')

//login
  exports.login = async(req , res)=>{
  //logic
  console.log('inside the login function');
  const { email , password} = req.body
  console.log( email,password);
  try {
    const existingUser = await users.findOne({email,password})
    if(existingUser){
      const token = jwt.sign({userId:existingUser._id},'secretkey')
        res.status(200).json({existingUser , token})
    }else{
      res.status(406).json('incorrect email id or password')
        
    }
  } catch (error) {
    res.status(401).json(error)
  }
  


  
}