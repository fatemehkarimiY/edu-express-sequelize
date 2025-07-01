const { Router } = require("express");
const sessionController = require("./session.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { createSessionValidation, updateSessionValidation } = require("./session.validation");
const router = Router();

router.post(
  "/",
  createSessionValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  sessionController.create
);
router.put(
  "/:id",
  updateSessionValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  sessionController.update
);
router.get(
  "/:id",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  sessionController.getById
);
router.delete(
  "/:id",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  sessionController.remove
);


module.exports = { SessionRoutes: router };
