const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Protects routes by requiring a valid JWT in the Authorization header.
 * Attaches the authenticated user (minus password) to req.user.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized, token invalid or expired" });
  }
});

/**
 * Restricts a route to admin-role users only. Must be used after `protect`.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Admin access required" });
};

module.exports = { protect, adminOnly };
