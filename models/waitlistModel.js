const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  reasonOfJoin: { type: String, required: true },
  excitesOfJoin: { type: String, required: true },
  platformUse: { type: String, required: true },  // Example: "Web, Mobile"
  infoOfPlatform: { type: String, required: true } ,
  points: { type: Number, required: true }// Example: "Social media, Friends, Ads"
}, { timestamps: true });

module.exports = mongoose.model('Waitlist', waitlistSchema);
