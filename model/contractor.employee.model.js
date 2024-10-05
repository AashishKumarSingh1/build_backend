"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentHistorySchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
}, { _id: false });
const EmployeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    locality: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    image: { type: String },
    payment: { type: Number, required: true },
    paymentHistory: { type: [PaymentHistorySchema], default: [] },
    contractor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeType: { type: String, required: true },
}, { timestamps: true });
const EmployeeModel = (0, mongoose_1.model)('Employee', EmployeeSchema);
exports.default = EmployeeModel;
