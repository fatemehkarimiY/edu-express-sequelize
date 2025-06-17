const createHttpError = require("http-errors");
const User = require("../user/user.model");
const { USER_ROLE } = require("../../constants/enums");

async function update({ userId, role }) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw createHttpError.NotFound("User not found");
  }
  if (
    !role ||
    typeof role !== "string" ||
    role.trim() === "" ||
    !Object.values(USER_ROLE).includes(role)
  ) {
    throw createHttpError.BadRequest("Invalid role provided");
  }
  user.role = role;
  await user.save();
}

module.exports = {
  update,
};
