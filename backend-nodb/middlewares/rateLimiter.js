const rateLimit = require("express-rate-limit");

/**
 * General API rate limiter. Values are configurable via env so production
 * deployments can tune limits without a code change.
 */
const apiLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

/**
 * Stricter limiter for the expensive AI analysis endpoint to control cost and abuse.
 */
const analyzeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many palm analysis requests. Please try again later." },
});

/**
 * Tighter limiter for auth endpoints to slow down brute-force attempts.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many auth attempts. Please try again later." },
});

module.exports = { apiLimiter, analyzeLimiter, authLimiter };
