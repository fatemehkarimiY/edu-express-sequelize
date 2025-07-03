// migrations/xxxxxx-create-profile.js
"use strict";
const path = require("path");
const { GENDER_ENUM } = require(path.resolve(__dirname, "../constants/enums"));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("profile", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fullname: Sequelize.STRING,
      avatar: Sequelize.STRING,
      bio: Sequelize.STRING,
      birth_date: Sequelize.DATE,
      latitude: Sequelize.DECIMAL(10, 7),
      longitude: Sequelize.DECIMAL(10, 7),
      gender: Sequelize.ENUM(...Object.values(GENDER_ENUM)),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("profile");
  },
};
