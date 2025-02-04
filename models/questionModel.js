const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  key: { type: String, required: true }, // Ensure `key` is required but not unique
  text: { type: String, required: true },
  points: { type: Number, required: true },
});

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  options: [optionSchema], // Array of options
});

module.exports = mongoose.model("Question", questionSchema);