const { Router } = require("express");
const sessionController = require("./session.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { createSessionValidation } = require("./session.validation");
const router = Router();

router.post(
  "/",
  createSessionValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  sessionController.create
);

module.exports = { SessionRoutes: router };
