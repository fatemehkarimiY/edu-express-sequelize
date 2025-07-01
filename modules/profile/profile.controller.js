const profileService = require("./profile.service");
const ProfileMessages = require("./profile.message");

async function update(req, res, next) {
  try {
    const id = req.user;
    const params = { ...req.body, id };
    const user = await profileService.updateProfile(params);
    res.status(200).json({
      message: ProfileMessages.profileUpdatedSuccessfully,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    
    const id = req.user;
    const user = await profileService.getProfile(id);
    res
      .status(200)
      .json({ message: ProfileMessages.getProfileSuccessfully, data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = { update, get };
