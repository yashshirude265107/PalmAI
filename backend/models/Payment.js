const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    provider: { type: String, enum: ["stripe", "razorpay", "manual"], default: "manual" },
    providerPaymentId: { type: String },
    status: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
    plan: { type: String, enum: ["single_report", "monthly", "yearly"], default: "single_report" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
