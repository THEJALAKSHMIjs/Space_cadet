const users = require("../models/userModel");
const otps = require('../models/otpModel')

const jwt = require('jsonwebtoken')

const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt');

// Login function
exports.login = async (req, res) => {
  // console.log('Inside the login function');
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const existingUser = await users.findOne({ username });

    if (!existingUser) {
      return res.json({ message: 'Incorrect username or password' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.json({ message: 'Incorrect username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: existingUser._id }, 'secretkey', { expiresIn: '1h' });

    // res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'Login successful', authoken: token });
    // res.cookies('token', token, { httpOnly: true });
  } catch (error) {
    res.json({ error: 'Server error' });
  }
};

// 🔹 Forgot Password - Sends Reset Link

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email);
  try {
    const user = await users.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    // Generate Reset Token
    // const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "15m" });
    // user.resetToken = token;
    // await user.save();

    // Generate a random 6-digit string
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store OTP in the database with expiration time
    const newOtp = new otps({
      email: email,
      otp: otp,
      createdAt: Date.now(),
      expireAt: Date.now() + 10 * 60 * 1000 // 10 minutes from now
    });
    await newOtp.save();

    // const resetLink = `http://localhost:4000/reset-password/${resetToken}`;
    // Nodemailer Transporter with .env credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Using .env Gmail credentials
        pass: process.env.GMAIL_PASS,
      },
    });

    // const resetLink = `http://localhost:4000/reset-password/${token}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Your OTP for resetting the password in Space Cadets is : <b>${otp}</b>. This link is valid only for 10 minutes.</p>`,
    });

    res.json({ message: "OTP is sent to your registered email address", email });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.json({ message: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await otps.findOne({ email });

    if (!otpRecord) {
      return res.json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (otpRecord.expireAt < Date.now()) {
      return res.json({ message: "OTP has expired" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.json({ message: "Server error" });
  }
}

// 🔹 Reset Password - Uses Email Instead of Token
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.json({ message: "Server error" });
  }
};

