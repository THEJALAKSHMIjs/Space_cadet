const Waitlist = require('../models/waitlistModel');
const Question = require('../models/questionModel'); // Import Question model

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

    const selectedQuestions = await Question.find({
      key: { $in: [excitesOfJoin, platformUse, infoOfPlatform] }
    });

    if (selectedQuestions.length !== 3) {
      return res.status(400).json({ message: "Invalid question selection" });
    }

    const points = selectedQuestions.reduce((total, question) => total + question.points, 0);

    const newEntry = new Waitlist({
      name,
      email,
      reasonOfJoin, 
      excitesOfJoin,
      platformUse,
      infoOfPlatform,
      points,
    });

    await newEntry.save();

    res.status(201).json({ message: "Successfully added to waitlist", points });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getWaitlistStats = async (req, res) => {
  try {
    const totalJoinees = await Waitlist.countDocuments(); // Get total waitlist count
    const maxSlots = 200;
    const percentageFilled = ((totalJoinees / maxSlots) * 100).toFixed(2); // Calculate percentage

    res.status(200).json({
      totalJoinees,
      percentageFilled: `${percentageFilled}%`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addToWaitlist, getWaitlistStats };
