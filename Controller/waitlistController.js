const Waitlist = require('../models/waitlistModel');
const Question = require('../models/questionModel'); // Import Question model
const Users = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); 
const bcrypt = require('bcrypt');
require('dotenv').config()


const generateCredentials = (name) => {
  const username = name.replace(/\s+/g, '').toLowerCase() + Math.floor(1000 + Math.random() * 9000);
  const password = crypto.randomBytes(6).toString('hex');
  return { username, password };
};

// Send email function
const sendEmail = async (email, username, password) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  let mailOptions = {
    from: 'demokairaliin@gmail.com',
    to: email,
    subject: 'Your Waitlist Credentials',
    text: `Hello, \n\nYou have been approved!\n\nUsername: ${username}\nPassword: ${password}\n\nKeep your credentials safe.\n\nBest,\nYour Team`
  };

  await transporter.sendMail(mailOptions);
};

const addToWaitlist = async (req, res) => {
  try {
    const { name, email, reasonOfJoin, excitesOfJoin, platformUse, infoOfPlatform } = req.body;

    if (!name || !email || !reasonOfJoin || !excitesOfJoin || !platformUse || !infoOfPlatform) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return res.status(400).json({ message: "Email already exists in the waitlist" });
    }

    
    const selectedQuestions = await Question.find({ key: { $in: [excitesOfJoin, platformUse, infoOfPlatform] } });

    if (selectedQuestions.length !== 3) {
      return res.status(400).json({ message: "Invalid question selection" });
    }

    const points = selectedQuestions.reduce((total, question) => total + question.points, 0);

  
    const newWaitlistEntry = new Waitlist({
      name,
      email,
      reasonOfJoin,
      excitesOfJoin,
      platformUse,
      infoOfPlatform,
      points
    });

    await newWaitlistEntry.save();

    if (points >= 80) {
      const { username, password } = generateCredentials(name);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({
        name,
        email,
        username,
        password: hashedPassword 
      });

      await newUser.save();
      await sendEmail(email, username, password);
    }

    res.status(201).json({
      message: points >= 80
        ? "Successfully added to waitlist. Credentials sent to email!"
        : "Successfully added to waitlist. Earn more points to get credentials.",
      points
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getWaitlistStats = async (req, res) => {
  try {
    const totalJoinees = await Waitlist.countDocuments(); 
    const maxSlots = 200;
    const percentageFilled = ((totalJoinees / maxSlots) * 100).toFixed(2); 

    res.status(200).json({
      totalJoinees,
      percentageFilled: `${percentageFilled}%`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addToWaitlist, getWaitlistStats };
