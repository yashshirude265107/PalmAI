const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
  createdAt: user.createdAt,
});

// @desc    Register a new user
// @route   POST /api/auth/signup
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email and password are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: "An account with this email already exists" });
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({ success: true, token, user: sanitizeUser(user) });
});

// @desc    Log in with email + password
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const token = generateToken(user._id);
  res.json({ success: true, token, user: sanitizeUser(user) });
});

// @desc    Log in / sign up via Google ID token
// @route   POST /api/auth/google
exports.googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ success: false, message: "idToken is required" });
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({
      name: payload.name,
      email: payload.email,
      googleId: payload.sub,
      avatar: payload.picture,
      isVerified: true,
    });
  }

  const token = generateToken(user._id);
  res.json({ success: true, token, user: sanitizeUser(user) });
});

// @desc    Request a password reset token (in production, email this link to the user)
// @route   POST /api/auth/forgot-password
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always respond with success to avoid leaking which emails are registered
  if (!user) {
    return res.json({ success: true, message: "If that account exists, a reset link has been sent" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  await user.save();

  // TODO: send `resetToken` via an email service (SendGrid, SES, etc.)
  res.json({
    success: true,
    message: "If that account exists, a reset link has been sent",
    ...(process.env.NODE_ENV === "development" && { devResetToken: resetToken }),
  });
});

// @desc    Reset password using the token from forgotPassword
// @route   POST /api/auth/reset-password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: "Token and newPassword are required" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = User.findByResetToken(hashedToken);

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ success: true, message: "Password has been reset. You can now log in." });
});
