const createHttpError = require("http-errors");
const User = require("../user/user.model");
const Profile = require("./profile.model");
const ProfileMessages = require("./profile.message");
const bcrypt = require("bcrypt");

/** * AuthService provides methods for user authentication, including login, sending OTP, and verifying OTP.
 * @module profileService
 */
async function updateProfile(params) {
  const {
    id,
    fullname,
    avatar,
    bio,
    birthDate,
    latitude,
    longitude,
    gender,
    password,
  } = params;
  if (!id) {
    throw createHttpError.NotFound("id " + ProfileMessages.isRequired);
  }
  const profile = await findProfileByUserId(id);

  const user = await User.findByPk(id);
  //todo
  if (fullname) {
    profile.fullname = fullname;
  }
  if (avatar) {
    profile.avatar = avatar;
  }
  if (bio) {
    profile.bio = bio;
  }
  if (birthDate) {
    profile.birthDate = birthDate;
  }
  if (latitude) {
    profile.latitude = latitude;
  }
  if (longitude) {
    profile.longitude = longitude;
  }
  if (gender) {
    profile.gender = gender;
  }
  if (password) {
    // const saltRounds = 10;
    // const hashedPass = bcrypt.hash(password,saltRounds)
    user.password = password
  }

  await profile.save();
  return profile;
}
async function getProfile(id) {
  if (!id) {
    throw createHttpError.NotFound("id " + ProfileMessages.isRequired);
  }

  const profile = await findProfileByUserId(id);

  return profile;
}

async function findProfileByUserId(userId) {
  const profile = await Profile.findOne({
    where: { userId: userId },
    include: {
      model: User,
      as: "user",
      attributes: ["mobile"],
    },
    raw: true,
  });
  if (!profile) {
    throw createHttpError.NotFound(ProfileMessages.notFount);
  }

  return profile;
}
module.exports = { updateProfile, getProfile };
