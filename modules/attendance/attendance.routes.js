const { Router } = require("express");
const attendanceController = require("./attendance.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const {
  createAttendanceValidation,
  updateAttendanceValidation,
} = require("./attendance.validation");
const router = Router();

router.post(
  "/",
  createAttendanceValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  attendanceController.create
);
router.put(
  "/:id",
  updateAttendanceValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  attendanceController.update
);
router.delete(
  "/:id",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  attendanceController.remove
);
router.get(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER, USER_ROLE.STUDENT),
  attendanceController.getList
);

module.exports = { AttendanceRoutes: router };
