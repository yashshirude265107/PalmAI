const express = require("express");
const { protect } = require("../middlewares/auth");
const { analyzeLimiter } = require("../middlewares/rateLimiter");
const { analyzePalm } = require("../controllers/analyzeController");

const router = express.Router();

router.post("/", protect, analyzeLimiter, analyzePalm);

module.exports = router;
