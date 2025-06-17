const { Router } = require("express");
const roleController = require("./role.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");


console.log(typeof AuthorizeRole)
const router = Router();
router.put(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN),
  roleController.update
);

module.exports = { RoleRoutes: router };
