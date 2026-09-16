const Report = require("../models/Report");
const { deletePalmImage } = require("../services/cloudinaryService");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all reports for the logged-in user, most recent first
// @route   GET /api/history
// @access  Private
exports.getHistory = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);

  const [reports, total] = await Promise.all([
    Report.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Report.countDocuments({ user: req.user._id }),
  ]);

  res.json({
    success: true,
    reports,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @desc    Get a single report by ID (must belong to the logged-in user)
// @route   GET /api/history/:id
// @access  Private
exports.getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
  if (!report) {
    return res.status(404).json({ success: false, message: "Report not found" });
  }
  res.json({ success: true, report });
});

// @desc    Delete a report owned by the logged-in user
// @route   DELETE /api/report/:id
// @access  Private
exports.deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
  if (!report) {
    return res.status(404).json({ success: false, message: "Report not found" });
  }

  await report.deleteOne();
  res.json({ success: true, message: "Report deleted" });
});
