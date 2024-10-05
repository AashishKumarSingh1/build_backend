"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: { type: String, },
    name: { type: String },
    email: { type: String },
    rollNo: { type: Number || String },
    college: { type: String },
    hostelName: { type: String },
    messContractorName: { type: String },
    type: { type: String, enum: ['student', 'contractor', 'super'], default: 'student' },
    contractorName: { type: String },
    workers: [{
            name: { type: String },
            role: { type: String },
            contact: { type: String }
        }],
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
