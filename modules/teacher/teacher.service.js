const User = require("../user/user.model");
const { USER_ROLE } = require("../../constants/enums");
const Profile = require("../profile/profile.model");

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

module.exports = {
  getList,
};
