const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, 
  text: { type: String, required: true }, 
  points: { type: Number, required: true } 
});

module.exports = mongoose.model('Question', questionSchema);
