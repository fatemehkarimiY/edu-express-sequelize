const authMessages = require("./auth.messages");
const authService = require("./auth.service");
async function login(req, res, next) {
  try {
    const { mobile, password } = req.body;

    const tokens = await authService.login(mobile, password);
    res.status(200).json({ message: authMessages.loginSuccess, data: tokens });
  } catch (error) {
    next(error);
  }
}
async function sendOtp(req, res, next) {
  try {
    const { mobile } = req.body;

    const { otp } = await authService.sendOtp(mobile);
    res.status(200).json({ message: authMessages.sendOtpSuccess, data: otp });
  } catch (error) {
    next(error);
  }
}
async function verifyOtp(req, res, next) {
  try {
    const { mobile, code } = req.body;

    const tokens = await authService.verifyOtp(mobile, code);
    res.status(200).json({ message: authMessages.loginSuccess, data: tokens });
  } catch (error) {
    next(error);
  }
}
async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;

    const tokens = await authService.refreshToken(refreshToken);
    res.status(200).json({ message: authMessages.refreshTokenSuccess, data: tokens });
  } catch (error) {
    next(error);
  }
}


module.exports = { login, sendOtp, verifyOtp,refreshToken };
