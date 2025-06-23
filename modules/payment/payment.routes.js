const { Router } = require("express");
const PaymentController = require("./payment.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");

const router = Router();
router.post(
  "/",
  // addCartItemValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  PaymentController.payment
);
router.post(
  "/verify",
  // addCartItemValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  PaymentController.paymentVerify
);

// router.get(
//   "/",
//   AuthMiddleware,
//   AuthorizeRole(USER_ROLE.STUDENT),
//   CartController.getCartItems
// );
// router.delete(
//   "/:id",
//   AuthMiddleware,
//   AuthorizeRole(USER_ROLE.STUDENT),
//   CartController.remove
// );

module.exports = { PaymentRoutes: router };
