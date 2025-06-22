
const { Router } = require("express");
const CartController = require("./cart.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { addCartItemValidation } = require("./cart.validation");


const router = Router();
router.post(
  "/add",
  addCartItemValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  CartController.add
);

router.get(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  CartController.getCartItems
);
router.delete(
  "/:id",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  CartController.remove
);

module.exports = { CartRoutes: router };
