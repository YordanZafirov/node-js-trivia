"use strict";

const { QueryTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Read the JSON file
      const rawData = fs.readFileSync(
        path.join(__dirname, "../../../data/data.json"),
        "utf8"
      );

      const jsonData = JSON.parse(rawData);
      const results = jsonData.results;

      const questions = results.map(async (quiz) => {
        const existingQuestion = await queryInterface.sequelize.query(
          `SELECT * FROM "Questions" WHERE question = :question`,
          {
            replacements: { question: quiz.question },
            type: QueryTypes.SELECT,
          }
        );

        if (existingQuestion.length === 0) {
          const categoryIdQuery = `SELECT id FROM "Categories" WHERE title = :title`;
          const difficultyIdQuery = `SELECT id FROM "Difficulties" WHERE title = :title`;

          const categoryId = await queryInterface.sequelize.query(
            categoryIdQuery,
            {
              replacements: { title: quiz.category },
              type: QueryTypes.SELECT,
            }
          );

          const difficultyId = await queryInterface.sequelize.query(
            difficultyIdQuery,
            {
              replacements: { title: quiz.difficulty },
              type: QueryTypes.SELECT,
            }
          );
          return {
            id: uuidv4(),
            category_id: categoryId[0].id,
            difficulty_id: difficultyId[0].id,
            type: quiz.type,
            question: quiz.question,
            correct_answer: quiz.correct_answer,
            incorrect_answers: quiz.incorrect_answers,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
      });
      const resolvedQuestions = await Promise.all(questions);

      const newQuestions = resolvedQuestions.filter(Boolean);
      if (newQuestions.length !== 0) {
        await queryInterface.bulkInsert("Questions", newQuestions);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Delete all seeded questions
      await queryInterface.bulkDelete("Questions", null, {});
      console.log("Seeded questions removed successfully.");
    } catch (error) {
      console.error("Error removing seeded questions:", error);
      throw error;
    }
  },
};
