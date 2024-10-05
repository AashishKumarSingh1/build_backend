"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LeaveSchema = new mongoose_1.Schema({
    // contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contractor: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    letterLink: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
const LeaveModel = (0, mongoose_1.model)('Leave', LeaveSchema);
exports.default = LeaveModel;
