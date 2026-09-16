const User = require("../models/User");
const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get the logged-in user's profile + basic stats
// @route   GET /api/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res) => {
  const reportCount = await Report.countDocuments({ user: req.user._id });

  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      role: req.user.role,
      createdAt: req.user.createdAt,
    },
    stats: { totalReports: reportCount },
  });
});

// @desc    Update the logged-in user's profile (name, avatar)
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;

  if (name) req.user.name = name;
  if (avatar) req.user.avatar = avatar;
  await req.user.save();

  res.json({ success: true, message: "Profile updated", user: { name: req.user.name, avatar: req.user.avatar } });
});
