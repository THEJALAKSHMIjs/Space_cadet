const users = require("../models/userModel");

const jwt = require('jsonwebtoken')

const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt');

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

// 🔹 Forgot Password - Sends Reset Link

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate Reset Token
    const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "15m" });
    user.resetToken = token;
    await user.save();

    // Nodemailer Transporter with .env credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Using .env Gmail credentials
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:4000/reset-password/${token}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
    });

    res.json({ message: "Reset password link sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// 🔹 Reset Password - Uses Email Instead of Token
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password and update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

