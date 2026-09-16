const express = require("express");
const { protect } = require("../middlewares/auth");
const { deleteReport } = require("../controllers/historyController");

const router = express.Router();

// DELETE /api/report/:id
router.delete("/:id", protect, deleteReport);

module.exports = router;
