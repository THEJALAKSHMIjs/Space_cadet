const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., "First1", "Second2"
  text: { type: String, required: true }, // Actual question text
  points: { type: Number, required: true } // Points assigned to this question
});

module.exports = mongoose.model('Question', questionSchema);
