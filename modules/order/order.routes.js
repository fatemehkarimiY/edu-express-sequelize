const { Router } = require("express");
const OrderController = require("./order.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const router = Router();

// router.post(
//   "/",
//   AuthMiddleware,
//   AuthorizeRole(USER_ROLE.STUDENT),
//   OrderController.createOrder
// );
router.get(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  OrderController.getUserOrders
);

module.exports = {
  OrderRoutes: router,
};
