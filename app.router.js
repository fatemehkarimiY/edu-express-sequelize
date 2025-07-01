const { Router } = require("express");
const { authRouters: AuthRouters } = require("./modules/auth/auth.routes");
const {
   ProfileRoutes,
} = require("./modules/profile/profile.routes");
const { RoleRoutes } = require("./modules/role/role.routes");
const {
   CourseRouters,
} = require("./modules/course/course.routes");
const {
  enrollmentRoutes: EnrollmentRoutes,
} = require("./modules/enrollment/enrollment.routes");
const { SessionRoutes } = require("./modules/session/session.routes");
const { AttendanceRoutes } = require("./modules/attendance/attendance.routes");
const { OrderRoutes } = require("./modules/order/order.routes");
const { PaymentRoutes } = require("./modules/payment/payment.routes");
const router = Router();

router.use("/auth", AuthRouters);
router.use("/profile", ProfileRoutes);
router.use("/role", RoleRoutes);
router.use("/course", CourseRouters);
router.use("/enrollment", EnrollmentRoutes);
router.use("/session", SessionRoutes);
router.use("/attendance", AttendanceRoutes);
router.use("/order", OrderRoutes);
router.use("/payment", PaymentRoutes);
module.exports = router;
