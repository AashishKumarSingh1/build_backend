"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    replies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }]
}, { timestamps: true });
const ChatModel = (0, mongoose_1.model)('Message', MessageSchema);
exports.default = ChatModel;
