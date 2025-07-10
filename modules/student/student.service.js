const User = require("../user/user.model");
const { USER_ROLE } = require("../../constants/enums");
const Profile = require("../profile/profile.model");
const Enrollment = require("../enrollment/enrollment.model");

async function getList({ query, userId, role }) {
  const { keyword, mobile, gender, courseId } = query;

  const userWhere = {
    role: USER_ROLE.STUDENT,
    ...(mobile && { mobile: { [Op.like]: `%${mobile}%` } }),
  };

  const profileWhere = {};
  if (gender) profileWhere.gender = gender;
  if (keyword) profileWhere.fullname = { [Op.like]: `%${keyword}%` };

  const include = [
    {
      model: Profile,
      as: "profile",
      where: Object.keys(profileWhere).length ? profileWhere : undefined,
    },
  ];

  if (courseId) {
    include.push({
      model: Enrollment,
      as: "enrollments",
      where: { courseId },
      attributes: [],
    });
  }
  const students = await User.findAll({
    where: userWhere,
    attributes: ["mobile", "id"],
    include,
  });

  return students;
}

module.exports = {
  getList,
};
