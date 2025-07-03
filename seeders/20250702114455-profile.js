"use strict";

const { GENDER_ENUM } = require("../constants/enums");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("profile", [
      {
        user_id: 1,
        fullname: "Master Admin",
        avatar: null,
        bio: null,
        birth_date: new Date("1990-01-01"),
        latitude: 35.6892,
        longitude: 51.389,
        gender: GENDER_ENUM.FEMALE,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        fullname: "teacher 1",
        avatar: null,
        bio: "teacher 1 bio",
        birth_date: new Date("1985-05-15"),
        latitude: 35.7,
        longitude: 51.4,
        gender: GENDER_ENUM.FEMALE,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        fullname: "teacher 2",
        avatar: null,
        bio: "teacher 2 bio",
        birth_date: new Date("1992-03-20"),
        latitude: 35.68,
        longitude: 51.42,
        gender: GENDER_ENUM.MALE,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        fullname: "std 1",
        avatar: null,
        bio: "std 1",
        birth_date: new Date("2001-07-10"),
        latitude: 35.695,
        longitude: 51.41,
        gender: GENDER_ENUM.FEMALE,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        fullname: "std 2",
        avatar: null,
        bio: "std 2",
        birth_date: new Date("2001-07-10"),
        latitude: 35.695,
        longitude: 51.41,
        gender: GENDER_ENUM.FEMALE,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        fullname: "std 3",
        avatar: null,
        bio: "std 3",
        birth_date: new Date("2001-07-10"),
        latitude: 35.695,
        longitude: 51.41,
        gender: GENDER_ENUM.MALE,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        fullname: "std 4",
        avatar: null,
        bio: "std 4",
        birth_date: new Date("2001-07-10"),
        latitude: 35.695,
        longitude: 51.41,
        gender: GENDER_ENUM.MALE,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("profile", null, {});
  },
};
