"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FoodItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, min: 0 },
    amount: { type: Number }
});
const RestOverFoodSchema = new mongoose_1.Schema({
    contractor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    foodItems: { type: [FoodItemSchema], required: true },
    dateAdded: { type: Date, default: Date.now }
}, { timestamps: true });
const RestOverFoodModel = (0, mongoose_1.model)('RestOverFood', RestOverFoodSchema);
exports.default = RestOverFoodModel;
