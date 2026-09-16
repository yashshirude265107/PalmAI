const Report = require("../models/Report");
const { analyzePalmImage } = require("../services/openaiService");
const asyncHandler = require("../utils/asyncHandler");

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

// @desc    Analyze Palm
// @route   POST /api/analyze
// @access  Private
exports.analyzePalm = asyncHandler(async (req, res) => {
  const {
    imageBase64,
    mimeType,
    imageUrl,
    handSide,
  } = req.body;

  // Validation
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
      message: "Image size must be less than 8MB",
    });
  }

  let aiResult;

  try {
    console.log("========== ANALYZE START ==========");
    console.log("Calling OpenAI...");

    aiResult = await analyzePalmImage(
      imageBase64,
      mimeType
    );

    console.log("OpenAI Success");
  } catch (err) {
    console.error("========== OPENAI ERROR ==========");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "AI analysis failed",
      detail:
        process.env.NODE_ENV === "development"
          ? err.stack
          : undefined,
    });
  }

  try {
    const report = Report.create({
      user_id: req.user.id,
      palmImageUrl: imageUrl,
      handSide: handSide || "unspecified",

      ...aiResult,

      analysisScore:
        aiResult.analysisScore || 0,

      status: "completed",
    });

    return res.status(201).json({
      success: true,
      report,
    });

  } catch (err) {

    console.error("========== SQLITE ERROR ==========");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});