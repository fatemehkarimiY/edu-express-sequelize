const { Sequelize } = require("sequelize");
const logger = require("../utils/logger");
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
    logger.info("connected to database successfully");
  })
  .catch((err) => logger.error("cannot connect to database: ", err));

module.exports = sequelize;
