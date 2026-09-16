const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Protect Routes
 */
const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });

    }

});

/**
 * Admin Middleware
 */
const adminOnly = (req, res, next) => {

    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });

    }

    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Admin access required",
        });

    }

    next();

};

module.exports = {
    protect,
    adminOnly,
};