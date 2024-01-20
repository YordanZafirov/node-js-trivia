const { Sequelize } = require("sequelize");
const { development } = require("../config/config");

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to db");
  })
  .catch((err) => {
    console.log("Error connecting to db", err);
  });

const db = {
  sequelize: sequelize,
  Category: require("./models/category")(sequelize),
  Question: require("./models/question")(sequelize),
  Difficulty: require("./models/difficulty")(sequelize),
};

module.exports = { db };
