"use strict";

const { Sequelize } = require("sequelize");
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Category, { foreignKey: "category_id" });
      Question.belongsTo(models.Difficulty, { foreignKey: "difficulty_id" });
    }
  }
  Question.init(
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      category_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        validate: {
          notNull: true,
        }
      },
      difficulty_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Difficulties",
          key: "id",
        },
        validate: {
          notNull: true,
        }
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      question: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      correct_answer: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      incorrect_answers: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Questions",
    }
  );
  return Question;
};
