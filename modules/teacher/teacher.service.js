const User = require("../user/user.model");
const { USER_ROLE, ENROLLMENT_STATUS } = require("../../constants/enums");
const Profile = require("../profile/profile.model");
const Course = require("../course/course.model");
const Enrollment = require("../enrollment/enrollment.model");
const sequelize = require("../../config/sequelize");

async function getList(query) {
  const { keyword, mobile, gender } = query;

  const teachers = await User.findAll({
    where: {
      role: USER_ROLE.TEACHER,
      ...(mobile && { mobile: { [Op.like]: `%${mobile}%` } }),
    },
    attributes: ["mobile", "id"],
    include: {
      model: Profile,
      as: "profile",
      where: {
        ...(gender && { gender }),
        ...(keyword && { fullname: { [Op.like]: `%${keyword}%` } }),
      },
    },
  });
  return teachers;
}

async function getPopularTeacher() {
  const list = await User.findAll({
    where: {
      role: USER_ROLE.TEACHER,
    },
    attributes: [
      "id",
      "mobile",
      [
        sequelize.fn("COUNT", sequelize.col("courses->enrollment.id")),
        "studentCount",
      ],
    ],
    include: [
      {
        model: Profile,
        as: "profile",
        attributes: ["fullname", "gender", "avatar"],
      },
      {
        model: Course,
        as: "courses",
        required: false,
        attributes: [],
        include: [
          {
            model: Enrollment,
            as: "enrollment",
            attributes: [],
            where: {
              status: ENROLLMENT_STATUS.COMPLETED,
            },
            required: false,
          },
        ],
      },
    ],
    group: ["User.id", "profile.id"],
    subQuery:false
  });
  return list
}

module.exports = {
  getList,
  getPopularTeacher,
};
