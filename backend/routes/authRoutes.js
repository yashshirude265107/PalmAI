const express = require("express");
const { authLimiter } = require("../middlewares/rateLimiter");

const {
  signup,
  login,
} = require("../controllers/authController");

const router = express.Router();

// Signup
router.post("/signup", authLimiter, signup);

// Login
router.post("/login", authLimiter, login);

module.exports = router;