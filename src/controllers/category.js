const { db } = require("../db/db");

exports.getCategory = async (req, res) => {
  try {
    // Get all categories and order them by title
    const categories = await db.Category.findAll({
      order: [["title", "ASC"]],
    });
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching difficulties", error: err.message });
  }
};
