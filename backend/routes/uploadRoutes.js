const express = require("express");
const multer = require("multer");
const { protect } = require("../middlewares/auth");
const { uploadPalm } = require("../controllers/uploadController");

const router = express.Router();

// Keep the file in memory; we stream it straight to Cloudinary as base64
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

router.post("/", protect, upload.single("image"), uploadPalm);

module.exports = router;
