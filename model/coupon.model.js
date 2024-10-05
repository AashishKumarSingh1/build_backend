"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CouponSchema = new mongoose_1.Schema({
    // contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contractor: { type: String },
    todaysSpent: { type: Number, default: 0, min: 0 },
    monthlySpent: { type: Number, min: 0 },
    yearlySpent: { type: Number, min: 0 },
    monthlyLimit: { type: Number, min: 0 },
    yearlyLimit: { type: Number, min: 0 },
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
const CouponModel = (0, mongoose_1.model)('Coupon', CouponSchema);
exports.default = CouponModel;
