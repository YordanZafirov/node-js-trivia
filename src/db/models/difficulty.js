"use strict";
const { Sequelize } = require("sequelize");
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Difficulty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Difficulty.init(
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      title: {
        type: Sequelize.DataTypes.ENUM("easy", "medium", "hard"),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Difficulties",
    }
  );
  return Difficulty;
};
