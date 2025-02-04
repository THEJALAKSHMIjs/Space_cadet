const Question = require('../models/questionModel');

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    
    const groupedQuestions = questions.reduce((acc, question) => {
      if (!acc[question.category]) acc[question.category] = [];
      acc[question.category].push({ key: question.key, text: question.text });
      return acc;
    }, {});

    res.json(groupedQuestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

module.exports = { getQuestions };
