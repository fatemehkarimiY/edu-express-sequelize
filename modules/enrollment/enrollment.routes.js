const { Router } = require("express");
const enrollmentController = require("./enrollment.controller");
const { AuthMiddleware } = require("../../middleware/authentication");
const { AuthorizeRole } = require("../../middleware/authorizeRole");
const { USER_ROLE } = require("../../constants/enums");
const { createEnrollmentValidation } = require("./enrollment.validation");

const router = Router();
router.post(
  "/",
  createEnrollmentValidation,
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  enrollmentController.create
);
router.get(
  "/",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  enrollmentController.getEnrollments
);
router.get(
  "/enrolled-students",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.ADMIN),
  enrollmentController.getEnrolledStudents
);
router.put(
  "/:id/cancel",
  AuthMiddleware,
  AuthorizeRole(USER_ROLE.STUDENT),
  enrollmentController.cancel
);

//unusual to delete an enrollment
// router.delete(
//   "/:id",
//   AuthMiddleware,
//   AuthorizeRole(USER_ROLE.STUDENT),
//   enrollmentController.remove
// );

module.exports = { enrollmentRoutes: router };
