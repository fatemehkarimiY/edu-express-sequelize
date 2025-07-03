const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const authMessages = require("./auth.messages");
const User = require("../user/user.model");
const Otp = require("../user/otp.model");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const Profile = require("../profile/profile.model");
const Token = require("../user/refreshToken.model");
const RefreshToken = require("../user/refreshToken.model");
/** * AuthService provides methods for user authentication, including login, sending OTP, and verifying OTP.
 * @module authService
 */
async function login(mobile, password) {
  //todo add validation
  // if (!mobile || !password) {
  //   throw createHttpError.BadRequest(authMessages.mobileAndPasswordRequired);
  // }

  const user = await User.findOne({ where: { mobile } });

  if (!user) {
    throw createHttpError.NotFound(authMessages.userNotFound);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw createHttpError.Unauthorized(authMessages.passwordIsIncorrect);
  }

  const tokens = generateToken({ id: user.id });
  return tokens;
}
async function sendOtp(mobile) {
  let user = await User.findOne({ where: { mobile } });
  if (user) {
    // Check if the user already has an active OTP
    const existOtp = await Otp.findOne({
      where: { userId: user.id, expiresAt: { [Op.gt]: new Date() } },
    });
    if (existOtp) {
      throw createHttpError.BadRequest(authMessages.otpAlreadySent);
    }
  } else {
    user = await User.create({ mobile });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // const hashedCode = await bcrypt.hash(code, 10);

  const otp = await Otp.create({
    userId: user.id,
    code,
    expiresAt: new Date(Date.now() + 60 * 1000 * 5), // 5 minutes
  });
  await user.update({ otpId: otp.id });

  return {
    otp,
  };
}
async function verifyOtp(mobile, otpCode) {
  const user = await User.findOne({ where: { mobile } });

  if (!user) {
    throw createHttpError.NotFound(authMessages.userNotFound);
  }
  const otp = await Otp.findOne({
    where: {
      code: otpCode,
      userId: user.id,
    },
  });
  if (otp && otp.expiresAt < new Date()) {
    throw createHttpError.Unauthorized("OTP code has expired");
  }
  if (!otp) {
    throw createHttpError.Unauthorized("Invalid OTP code");
  }

  const profile = await Profile.findOne({ where: { userId: user.id } });
  if (!profile) {
    await Profile.create({ userId: user.id });
  }

  const tokens = generateToken({ id: user.id, role: user?.role });

  await RefreshToken.create({
    userId: user.id,
    token: tokens.refreshToken,
    expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 7 days
  });

  return tokens;
}
function generateToken(payload) {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "6d",
  });

  return { refreshToken, accessToken };
}

module.exports = { login, sendOtp, verifyOtp };
