const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/history
exports.getHistory = asyncHandler(async (req, res) => {

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);

    const offset = (page - 1) * limit;

    const reports = Report.findByUserPaged(
        req.user.id,
        limit,
        offset
    );

    const total = Report.countByUser(req.user.id);

    res.json({
        success: true,
        reports,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    });

});


// GET /api/history/:id
exports.getReportById = asyncHandler(async (req, res) => {

    const report = Report.findById(req.params.id);

    if (!report || report.user_id != req.user.id) {
        return res.status(404).json({
            success: false,
            message: "Report not found",
        });
    }

    res.json({
        success: true,
        report,
    });

});


// DELETE /api/report/:id
exports.deleteReport = asyncHandler(async (req, res) => {

    const report = Report.findById(req.params.id);

    if (!report || report.user_id != req.user.id) {
        return res.status(404).json({
            success: false,
            message: "Report not found",
        });
    }

    Report.delete(req.params.id);

    res.json({
        success: true,
        message: "Report deleted",
    });

});