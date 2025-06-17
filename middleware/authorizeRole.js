function AuthorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.role;

    console.log(allowedRoles,userRole);
    if (!userRole) {
      return res.status(403).json({ message: "Forbidden: No role provided" });
    }
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
}

module.exports = { AuthorizeRole };
