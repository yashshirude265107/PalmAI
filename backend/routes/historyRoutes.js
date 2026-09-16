const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  getHistory,
  getReportById,
  deleteReport,
} = require("../controllers/historyController");

const router = express.Router();

router.get("/", protect, getHistory);
router.get("/:id", protect, getReportById);
router.delete("/:id", protect, deleteReport);

module.exports = router;