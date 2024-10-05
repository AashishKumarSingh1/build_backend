"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HomeSchema = new mongoose_1.Schema({
    heroImage: { type: [String], required: true },
    totalContractorsAssociated: { type: Number, required: true },
    totalStudentsAssociated: { type: Number, required: true },
    totalMessAssociated: { type: Number, required: true },
    totalNgoAssociated: { type: Number, required: true },
    faq: [{ question: { type: String, required: true }, answer: { type: String, required: true } }],
    navbar: { type: [String], enum: ['login', 'sign up', 'contractor student', 'help', 'contact'], required: true },
    comments: [{
            user: { type: String, required: true },
            content: { type: String, required: true },
            date: { type: Date, default: Date.now },
            replies: [{ user: { type: String, required: true }, content: { type: String, required: true }, date: { type: Date, default: Date.now } }]
        }],
    creators: [{
            image: { type: String, required: true },
            description: { type: String, required: true },
            academics: { type: String, required: true },
            socialMediaProfiles: { type: Map, of: String, required: true }
        }],
    lastUpdated: { type: Date, default: Date.now },
    featuredContent: { type: String }
}, { timestamps: true });
const HomePage = (0, mongoose_1.model)('Home', HomeSchema);
exports.default = HomePage;
