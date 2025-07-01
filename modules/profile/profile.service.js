const createHttpError = require("http-errors");
const User = require("../user/user.model");
const Profile = require("./profile.model");
const ProfileMessages = require("./profile.message");

/** * AuthService provides methods for user authentication, including login, sending OTP, and verifying OTP.
 * @module profileService
 */
async function updateProfile(params) {
  const { id, fullname, avatar, bio, birthDate, latitude, longitude, gender } =
    params;
  if (!id) {
    throw createHttpError.NotFound("id " + ProfileMessages.isRequired);
  }
  const profile = await findProfileByUserId(id);

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
