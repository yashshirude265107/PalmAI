const User = require("../models/User");
const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/profile
exports.getProfile = asyncHandler(async (req, res) => {

    const reportCount = Report.countByUser(req.user.id);

    res.json({

        success: true,

        user: {

            id: req.user.id,

            name: req.user.name,

            email: req.user.email,

            avatar: req.user.avatar || "",

            role: req.user.role || "user",

        },

        stats: {

            totalReports: reportCount,

        },

    });

});

// PUT /api/profile
exports.updateProfile = asyncHandler(async (req, res) => {

    const {

        name,

        avatar,

    } = req.body;

    const updatedUser = User.updateProfile(

        req.user.id,

        name || req.user.name,

        avatar || req.user.avatar

    );

    res.json({

        success: true,

        message: "Profile updated",

        user: {

            id: updatedUser.id,

            name: updatedUser.name,

            email: updatedUser.email,

            avatar: updatedUser.avatar,

            role: updatedUser.role,

        },

    });

});