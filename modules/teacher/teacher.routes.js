const { Router } = require("express");
const teacherController = require("./teacher.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
// const { assignRoleValidation } = require("./teacher.validation");

const router = Router();
router.get(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN),
  teacherController.getList
);

module.exports = { TeacherRoutes: router };
