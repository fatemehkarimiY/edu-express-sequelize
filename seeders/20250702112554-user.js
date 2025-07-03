"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        mobile: "1",
        role: "admin",
        password: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        mobile: "2",
        role: "teacher",
        password: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        mobile: "3",
        role: "teacher",
        password: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        mobile: "4",
        role: "student",
        password: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        mobile: "5",
        role: "student",
        password: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        mobile: "6",
        role: "student",
        password: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        mobile: "7",
        role: "student",
        password: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {});
  },
};
