const { Router } = require("express");
const courseController = require("./course.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { createCourseValidation, updateCourseValidation } = require("./course.validation");
const router = Router();

router.post(
  "/",
  createCourseValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  courseController.create
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

module.exports = { courseRouters: router };
