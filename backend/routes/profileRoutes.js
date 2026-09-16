const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

module.exports = router;