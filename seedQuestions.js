const mongoose = require('mongoose');
const Question = require('./models/questionModel');

mongoose.connect('mongodb+srv://thejalakshmi622:space@cluster0.ysusr.mongodb.net/spaceCadet?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const questions = [
  { key: "First1", text: "Why do you want to join?", points: 40 },
  { key: "First2", text: "What excites you the most?", points: 30 },
  { key: "First3", text: "What is your primary goal?", points: 20 },
  { key: "First4", text: "Are you exploring new opportunities?", points: 10 },
  { key: "Second1", text: "Do you like community engagement?", points: 40 },
  { key: "Second2", text: "Are you looking for mentorship?", points: 30 },
  { key: "Second3", text: "Do you want hands-on experience?", points: 20 },
  { key: "Second4", text: "Are you just exploring?", points: 10 },
  { key: "Third1", text: "Do you prefer web-based platforms?", points: 40 },
  { key: "Third2", text: "Are you interested in mobile apps?", points: 30 },
  { key: "Third3", text: "Do you want a mix of both?", points: 20 },
  { key: "Third4", text: "Would you like offline sessions?", points: 10 }
];

const seedQuestions = async () => {
  try {
    // ✅ Remove existing questions to avoid duplicates
    await Question.deleteMany({});
    console.log("Existing questions deleted.");

    // ✅ Insert new questions
    await Question.insertMany(questions);
    console.log("Questions seeded successfully!");

  } catch (error) {
    console.error("Error seeding questions:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedQuestions();
