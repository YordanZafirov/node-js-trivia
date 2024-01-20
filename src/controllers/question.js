const { db } = require("../db/db");
const { v4: isUUID } = require("uuid");

exports.getQuestion = async (req, res) => {
  const { category, difficulty } = req.query;

  try {
    // Validate category and difficulty
    if (!category || !difficulty) {
      return res
        .status(400)
        .json({ message: "Category and difficulty are required" });
    }

    // Check if the provided category and difficulty exist
    const [categoryExists, difficultyExists] = await Promise.all([
      db.Category.findOne({ where: { id: category } }),
      db.Difficulty.findOne({ where: { id: difficulty } }),
    ]);

    if (!categoryExists || !difficultyExists) {
      return res
        .status(404)
        .json({ message: "Category or difficulty not found" });
    }

    // Get all questions that match the category and difficulty
    const questions = await db.Question.findAll({
      where: {
        category_id: category,
        difficulty_id: difficulty,
      },
    });

    // Validate UUIDs
    const isValidUUID = (id) => isUUID(id);

    const isValidQuestion = questions.every((question) => {
      return (
        isValidUUID(question.id) &&
        isValidUUID(question.category_id) &&
        isValidUUID(question.difficulty_id) &&
        isValidUUID(category) &&
        isValidUUID(difficulty)
      );
    });

    if (!isValidQuestion) {
      return res
        .status(400)
        .json({ message: "Invalid UUIDs found in questions or query" });
    }

    // Shuffle the array of questions
    const shuffledQuestions = shuffleArray(questions);

    res.status(200).json(shuffledQuestions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching question", error: err.message });
  }
};

// Utility function to shuffle an array
function shuffleArray(array) {
 return array.sort(() => Math.random() - 0.5);
}
