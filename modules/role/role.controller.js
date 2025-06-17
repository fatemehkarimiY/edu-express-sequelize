const roleService = require("./role.service");

async function update(req, res, next) {
  try {
    const { userId, role } = req.body;

    await roleService.update({ userId, role });
    res.status(200).json({
      message: "Role updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { update };
