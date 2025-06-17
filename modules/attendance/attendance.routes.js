const { Router } = require("express");
const attendanceController = require("./attendance.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { createAttendanceValidation } = require("./attendance.validation");
const router = Router();

router.post(
  "/",
  createAttendanceValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  attendanceController.create
);

module.exports = { AttendanceRoutes: router };
