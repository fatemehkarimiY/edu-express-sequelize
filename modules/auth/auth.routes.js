const { Router } = require("express");
const authController = require("./auth.controller");
const {
  sendOtpValidation,
  verifyOtpValidation,
  refreshTokenValidation,
} = require("./auth.validation");
const router = Router();

router.post("/login", authController.login);
router.post("/send-otp", sendOtpValidation, authController.sendOtp);
router.post("/verify-otp", verifyOtpValidation, authController.verifyOtp);
router.post("/refresh-token", refreshTokenValidation, authController.refreshToken);

module.exports = { authRouters: router };
