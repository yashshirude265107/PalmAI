const Report = require("../models/Report");
const { analyzePalmImage } = require("../services/openaiService");
const asyncHandler = require("../utils/asyncHandler");

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_SIZE_BYTES = 8 * 1024 * 1024;

// POST /api/analyze
exports.analyzePalm = asyncHandler(async (req, res) => {

  const {
    imageBase64,
    mimeType,
    imageUrl,
    handSide,
  } = req.body;

  if (!imageBase64 || !mimeType || !imageUrl) {
    return res.status(400).json({
      success: false,
      message: "imageBase64, mimeType and imageUrl are required",
    });
  }

  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return res.status(400).json({
      success: false,
      message: "Unsupported image type",
    });
  }

  const approxBytes = imageBase64.length * 0.75;

  if (approxBytes > MAX_SIZE_BYTES) {
    return res.status(400).json({
      success: false,
      message: "Image must be under 8MB",
    });
  }

  let aiResult;

  try {

    aiResult = await analyzePalmImage(
      imageBase64,
      mimeType
    );

  } catch (err) {

    return res.status(502).json({
      success: false,
      message: "AI Analysis Failed",
      detail:
        process.env.NODE_ENV === "development"
          ? err.message
          : undefined,
    });

  }

  const report = Report.create({

    user_id: req.user.id,

    palmImageUrl: imageUrl,

    handSide: handSide || "unspecified",

    ...aiResult,

    analysisScore:
      aiResult.analysisScore || 0,

    status: "completed",

  });

  res.status(201).json({

    success: true,

    report,

  });

});