const users = require("../models/userModel");

//register
  exports.register = async(req , res)=>{
  //logic
  console.log('inside the register function');
  const { username , email} = req.body
  console.log(username , email);
  try {
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json('user already exist')
    }else{
        const newUser = new users({
            username,
            email
           
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
  } catch (error) {
    res.status(401).json(error)
  }
  


  
}