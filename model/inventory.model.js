"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FoodItemDetailSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
}, { _id: false });
const InventorySchema = new mongoose_1.Schema({
    items: { type: [FoodItemDetailSchema], required: true },
    contractor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
const InventoryModel = (0, mongoose_1.model)('Inventory', InventorySchema);
exports.default = InventoryModel;
