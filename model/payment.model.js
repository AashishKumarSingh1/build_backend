"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});
const PaymentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [ItemSchema], required: true },
    totalAmount: { type: Number, required: true },
}, { timestamps: true });
const PaymentModel = (0, mongoose_1.model)('Payment', PaymentSchema);
exports.default = PaymentModel;
