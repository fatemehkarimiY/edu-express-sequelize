"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user_otp", [
      {
        user_id: 1,
        code: "123456",
        expires_at: new Date(Date.now() + 5 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        code: "654321",
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        code: "112233",
        expires_at: new Date(Date.now() + 7 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        code: "445566",
        expires_at: new Date(Date.now() + 15 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        code: "778899",
        expires_at: new Date(Date.now() + 20 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        code: "778899",
        expires_at: new Date(Date.now() + 20 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        code: "778899",
        expires_at: new Date(Date.now() + 20 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        code: "778899",
        expires_at: new Date(Date.now() + 20 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        code: "778899",
        expires_at: new Date(Date.now() + 20 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_otp", null, {});
  },
};
