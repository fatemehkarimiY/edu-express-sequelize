const createHttpError = require("http-errors");
const User = require("../user/user.model");
const Profile = require("./profile.model");
const ProfileMessages = require("./profile.message");
const { hashPassword } = require("../../utils/password");

async function updateProfile(payload) {
  const { id } = payload;
  const profile = await Profile.findOne({ where: { userId: id } });
  if (!profile) {
    throw createHttpError.NotFound(ProfileMessages.notFount);
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw createHttpError.NotFound(ProfileMessages.notFount);
  }

  const profileKeys = [
    "fullname",
    "avatar",
    "bio",
    "birthDate",
    "latitude",
    "longitude",
    "gender",
  ];
  for (const key of profileKeys) {
    if (payload.hasOwnProperty(key)) {
      profile[key] = payload[key];
    }
  }

  if (payload.password) {
    user.password = await hashPassword(payload.password);
  }

  await user.save();
  await profile.save();
  return profile;
}
async function getProfile(id) {
  const profile = await Profile.findOne({
    where: { userId: id },
    include: {
      model: User,
      as: "user",
      attributes: ["mobile"],
    },
    // raw: true,
  });
  if (!profile) {
    throw createHttpError.NotFound(ProfileMessages.notFount);
  }

  return profile;
}

module.exports = { updateProfile, getProfile };
