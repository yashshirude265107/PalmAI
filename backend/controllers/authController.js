const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

// ---------------------
// Helper
// ---------------------
const sanitizeUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || "",
    role: user.role || "user"
});

// ---------------------
// Signup
// POST /api/auth/signup
// ---------------------
exports.signup = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, Email and Password are required"
        });
    }

    const existing = User.findOne(email);

    if (existing) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const token = generateToken(user.id);

    res.status(201).json({
        success: true,
        token,
        user: sanitizeUser(user)
    });

});


// ---------------------
// Login
// POST /api/auth/login
// ---------------------
exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });
    }

    const user = User.findOne(email);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const match = await User.comparePassword(
        password,
        user.password
    );

    if (!match) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const token = generateToken(user.id);

    res.json({
        success: true,
        token,
        user: sanitizeUser(user)
    });

});


// ---------------------
// Google Login
// ---------------------
exports.googleLogin = asyncHandler(async (req, res) => {

    return res.status(501).json({
        success: false,
        message: "Google Login not implemented in SQLite version"
    });

});


// ---------------------
// Forgot Password
// ---------------------
exports.forgotPassword = asyncHandler(async (req, res) => {

    return res.status(501).json({
        success: false,
        message: "Forgot Password not implemented"
    });

});


// ---------------------
// Reset Password
// ---------------------
exports.resetPassword = asyncHandler(async (req, res) => {

    return res.status(501).json({
        success: false,
        message: "Reset Password not implemented"
    });

});