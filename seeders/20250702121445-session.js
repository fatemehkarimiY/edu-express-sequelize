"use strict";

const { SESSION_STATUS } = require("../constants/enums");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("session", [
      {
        course_id: 1,
        date: new Date("2025-08-10T10:00:00Z"),
        description: "Introduction to JavaScript basics.",
        status: SESSION_STATUS.DRAFT,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        course_id: 1,
        date: new Date("2025-08-17T10:00:00Z"),
        description: "Working with variables and data types.",
        status: SESSION_STATUS.DRAFT,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        course_id: 2,
        date: new Date("2025-09-01T14:00:00Z"),
        description: "UI design fundamentals: layout and spacing.",
        status: SESSION_STATUS.IN_PROGRESS,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("session", null, {});
  },
};
