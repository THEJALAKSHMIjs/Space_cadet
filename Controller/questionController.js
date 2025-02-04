const Question = require('../models/questionModel');

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); // Fetch all questions from MongoDB

    // Group questions by category
    const groupedQuestions = {
      First: [],
      Second: [],
      Third: [],
    };

    questions.forEach((question) => {
      if (groupedQuestions[question.category]) {
        groupedQuestions[question.category].push(...question.options); // Append options instead of overwriting
      }
    });

    res.json(groupedQuestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

module.exports = { getQuestions };
