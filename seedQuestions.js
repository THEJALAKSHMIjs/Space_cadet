const seedQuestions = async () => {
  try {
    await Question.deleteMany(); // Clear old data

    const questions = {
      questions: [
        {
          category: "First",
          options: [
            { key: "First1", text: "Why do you want to join?", points: 40 },
            { key: "First2", text: "What excites you the most?", points: 30 },
            { key: "First3", text: "What is your primary goal?", points: 20 },
            { key: "First4", text: "Are you exploring new opportunities?", points: 10 },
          ],
        },
        {
          category: "Second",
          options: [
            { key: "Second1", text: "Do you like community engagement?", points: 40 },
            { key: "Second2", text: "Are you looking for mentorship?", points: 30 },
            { key: "Second3", text: "Do you want hands-on experience?", points: 20 },
            { key: "Second4", text: "Are you just exploring?", points: 10 },
          ],
        },
        {
          category: "Third",
          options: [
            { key: "Third1", text: "Do you prefer web-based platforms?", points: 40 },
            { key: "Third2", text: "Are you interested in mobile apps?", points: 30 },
            { key: "Third3", text: "Do you want a mix of both?", points: 20 },
            { key: "Third4", text: "Would you like offline sessions?", points: 10 },
          ],
        },
      ],
    };

    await Question.create(questions); // Insert all as one document
    console.log("✅ Questions inserted as one document.");
  } catch (error) {
    console.error("❌ Error seeding questions:", error);
  } finally {
    mongoose.connection.close();
  }
};
