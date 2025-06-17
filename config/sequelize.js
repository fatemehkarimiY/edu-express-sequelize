const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "mariadb",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  logging: false, // Disable logging; default: console.log
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => console.log("cannot connect to database: ", err));

module.exports = sequelize;
