"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Fetch existing categories
      const existingCategories = await queryInterface.sequelize.query(
        'SELECT title FROM "Categories";',
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Filter out categories that already exist
      const categoriesToInsert = [
        {
          id: uuidv4(),
          title: "film",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
        {
          id: uuidv4(),
          title: "science",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
        {
          id: uuidv4(),
          title: "sport",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
      ].filter(
        (category) =>
          !existingCategories.some(
            (existing) => existing.title === category.title
          )
      );

      // Insert only unique categories
      if (categoriesToInsert.length > 0) {
        return queryInterface.bulkInsert("Categories", categoriesToInsert, {});
      } else {
        return Promise.resolve(); 
      }
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
