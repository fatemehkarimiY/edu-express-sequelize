// migrations/xxxxxx-create-user.js
"use strict";

const { USER_ROLE } = require("../constants/enums");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM(...Object.values(USER_ROLE)),
        defaultValue: "user",
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
  },
};
