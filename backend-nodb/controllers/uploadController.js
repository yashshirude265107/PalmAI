const { uploadPalmImage } = require("../services/cloudinaryService");
const asyncHandler = require("../utils/asyncHandler");

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

// @desc    Upload a palm image (multipart) and store it on Cloudinary
// @route   POST /api/upload
// @access  Private
exports.uploadPalm = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file provided" });
  }

  if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
    return res.status(400).json({ success: false, message: "Only JPEG, PNG, or WEBP images are allowed" });
  }

  if (req.file.size > MAX_SIZE_BYTES) {
    return res.status(400).json({ success: false, message: "Image must be smaller than 8MB" });
  }

  const base64DataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  const { url, publicId } = await uploadPalmImage(base64DataUrl);

  res.status(201).json({ success: true, imageUrl: url, publicId });
});
