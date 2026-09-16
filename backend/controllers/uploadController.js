const asyncHandler = require("../utils/asyncHandler");

const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

const MAX_SIZE_BYTES = 8 * 1024 * 1024;

// POST /api/upload
exports.uploadPalm = asyncHandler(async (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            success: false,
            message: "No image uploaded"
        });

    }

    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {

        return res.status(400).json({
            success: false,
            message: "Only JPG, PNG and WEBP allowed"
        });

    }

    if (req.file.size > MAX_SIZE_BYTES) {

        return res.status(400).json({
            success: false,
            message: "Image must be under 8MB"
        });

    }

    const base64 = req.file.buffer.toString("base64");

    res.json({

        success: true,

        imageBase64: base64,

        mimeType: req.file.mimetype,

        imageUrl: "local-upload"

    });

});