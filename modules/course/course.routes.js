const { Router } = require("express");
const courseController = require("./course.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const {
  createCourseValidation,
  updateCourseValidation,
} = require("./course.validation");
const router = Router();

router.post(
  "/",
  createCourseValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.create
);

router.get(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.getList
);

router.get(
  "/complete-stats",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN),
  courseController.getCompleteCoursesStats
);

router.get(
  "/:id",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.getById
);
router.get(
  "/:courseId/sessions",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.getCourseSessions
);
router.get(
  "/:courseId/students",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.getCourseStudents
);

router.put(
  "/:id",
  updateCourseValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.update
);

router.delete(
  "/:id",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.remove
);

module.exports = { CourseRouters: router };
