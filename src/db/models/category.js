"use strict";
const { Sequelize } = require("sequelize");
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {

  class Category extends Model {

  }
  Category.init(
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      title: {
        type: Sequelize.DataTypes.ENUM("film", "science", "sport"),
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
      modelName: "Categories",
    }
  );
  return Category;
};
