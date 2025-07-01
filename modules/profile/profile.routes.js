const { Router } = require("express");
const profileController = require("./profile.controller");
const { AuthMiddleware } = require("../../middleware/authentication");

const router = Router();
router.put("/", AuthMiddleware, profileController.update);
router.get("/", AuthMiddleware, profileController.get);

module.exports = {
  ProfileRoutes: router,
};
