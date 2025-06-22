const express = require("express");
const { ErrorHandler } = require("./middleware/errorHandler");
const { NotFoundHandler } = require("./middleware/notfound");
const { initModels } = require("./config/initModels");
const { authRouters } = require("./modules/auth/auth.routes");
const { profileRoutes } = require("./modules/profile/profile.routes");
const { RoleRoutes } = require("./modules/role/role.routes");
const { courseRouters } = require("./modules/course/course.routes");
const { enrollmentRoutes } = require("./modules/enrollment/enrollment.routes");
const { SessionRoutes } = require("./modules/session/session.routes");
const { AttendanceRoutes } = require("./modules/attendance/attendance.routes");
const { CartRoutes } = require("./modules/cart/cart.routes");
require("dotenv").config();

async function main() {
  const app = express();
  await initModels();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //routes
  app.use("/auth", authRouters);
  app.use("/profile", profileRoutes);
  app.use("/role", RoleRoutes);
  app.use("/course", courseRouters);
  app.use("/enrollment", enrollmentRoutes);
  app.use("/session", SessionRoutes);
  app.use("/attendance", AttendanceRoutes);
  app.use("/cart", CartRoutes);

  app.use(NotFoundHandler);
  app.use(ErrorHandler);

  const port = process.env.PORT ?? 3000;
  app.listen(port, () => {
    console.log(`app is running on port: http://localhost:${port}`);
  });
}

main();
