"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FoodItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String }
}, { timestamps: true });
const MessMenuSchema = new mongoose_1.Schema({
    items: { type: [FoodItemSchema], default: [] },
    contractor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
const MessMenuModel = (0, mongoose_1.model)('MessMenu', MessMenuSchema);
exports.default = MessMenuModel;
