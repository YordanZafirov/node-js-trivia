"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Fetch existing difficulties
      const existingDifficulties = await queryInterface.sequelize.query(
        'SELECT title FROM "Difficulties";',
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Filter out difficulties that already exist
      const difficultiesToInsert = [
        {
          id: uuidv4(),
          title: "easy",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
        {
          id: uuidv4(),
          title: "medium",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
        {
          id: uuidv4(),
          title: "hard",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
      ].filter(
        (difficulty) =>
          !existingDifficulties.some(
            (existing) => existing.title === difficulty.title
          )
      );

      // Insert only unique difficulties
      if (difficultiesToInsert.length > 0) {
        return queryInterface.bulkInsert(
          "Difficulties",
          difficultiesToInsert,
          {}
        );
      } else {
        return Promise.resolve(); // Return a resolved promise if no new difficulties to insert
      }
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
