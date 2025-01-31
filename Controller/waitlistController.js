const Waitlist = require('../models/waitlistModel');
const Question = require('../models/questionModel'); // Import Question model

const addToWaitlist = async (req, res) => {
  try {
    const { name, email, reasonOfJoin, excitesOfJoin, platformUse, infoOfPlatform } = req.body;

    // ✅ Ensure all required fields are provided
    if (!name || !email || !reasonOfJoin || !excitesOfJoin || !platformUse || !infoOfPlatform) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if email already exists in the waitlist
    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return res.status(400).json({ message: "Email already exists in the waitlist" });
    }

    // ✅ Fetch question points dynamically (excluding reasonOfJoin)
    const selectedQuestions = await Question.find({
      key: { $in: [excitesOfJoin, platformUse, infoOfPlatform] }
    });

    // ✅ Validate if all selected questions exist in the database
    if (selectedQuestions.length !== 3) {
      return res.status(400).json({ message: "Invalid question selection" });
    }

    // ✅ Calculate total points (only from excitesOfJoin, platformUse, and infoOfPlatform)
    const points = selectedQuestions.reduce((total, question) => total + question.points, 0);

    // ✅ Save new waitlist entry
    const newEntry = new Waitlist({
      name,
      email,
      reasonOfJoin, // Storing reasonOfJoin but NOT using it for points
      excitesOfJoin,
      platformUse,
      infoOfPlatform,
      points, // Calculated points
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
