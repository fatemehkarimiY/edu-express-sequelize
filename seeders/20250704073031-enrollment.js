"use strict";

const { ENROLLMENT_STATUS } = require("../constants/enums");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("enrollment", [
      {
        course_id: 1,
        student_id: 5,
        status: ENROLLMENT_STATUS.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        course_id: 2,
        student_id: 5,
        status: ENROLLMENT_STATUS.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("enrollment", null, {});
  },
};
