const Waitlist = require('../models/waitlistModel');


const addToWaitlist = async (req, res) => {
  try {
    const { name, email, reasonOfJoin, excitesOfJoin, platformUse, infoOfPlatform } = req.body;

    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) return res.status(400).json({ message: 'Email already exists in the waitlist' });

    const newEntry = new Waitlist({ name, email, reasonOfJoin, excitesOfJoin, platformUse, infoOfPlatform });
    await newEntry.save();

    res.status(201).json({ message: 'Successfully added to waitlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getAllWaitlistEntries = async (req, res) => {
  try {
    const waitlist = await Waitlist.find().sort({ createdAt: -1 }); 
    res.status(200).json(waitlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// const getWaitlistEntryByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;

//     const entry = await Waitlist.findOne({ email });
//     if (!entry) return res.status(404).json({ message: 'No waitlist entry found with this email' });

//     res.status(200).json(entry);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

module.exports = { addToWaitlist, getAllWaitlistEntries, getWaitlistEntryByEmail };
