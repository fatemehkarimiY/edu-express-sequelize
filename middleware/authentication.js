const jwt = require("jsonwebtoken");
const User = require("../modules/user/user.model");
require("dotenv").config();
async function AuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: "User not exist" });
    }
    req.user = user.id;
    req.role = user.role;
    next();
  } catch (error) {
    console.log("error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { AuthMiddleware };
