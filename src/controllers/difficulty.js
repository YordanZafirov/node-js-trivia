const { db } = require("../db/db");

exports.getDifficulty = async (req, res) => {
  try {
    // Get all difficulties and order them by title
    const difficulty = await db.Difficulty.findAll({
      order: [["title", "ASC"]],
    });
    res.status(200).json(difficulty);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching difficulties", error: err.message });
  }
};
