const { Router } = require("express");
const roleController = require("./role.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { assignRoleValidation } = require("./role.validation");

const router = Router();
router.put(
  "/",
  assignRoleValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN),
  roleController.update
);

module.exports = { RoleRoutes: router };
