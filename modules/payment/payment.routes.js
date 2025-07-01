const { Router } = require("express");
const PaymentController = require("./payment.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { verifyPaymentValidation } = require("./payment.validation");

const router = Router();
router.post(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  PaymentController.payment
);
router.post(
  "/verify",
  verifyPaymentValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  PaymentController.paymentVerify
);

module.exports = { PaymentRoutes: router };
