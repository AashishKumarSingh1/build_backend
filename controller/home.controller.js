"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const mailSender_1 = require("../utils/mailSender");
const home_model_1 = __importDefault(require("../model/home.model"));
class contactController {
    static contact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, message } = req.body.formData;
            try {
                const message1 = "Thank you for Using Sarwam! We appreciate your trust in us. Rest assured, we will reach out to you soon to address your query and provide the assistance you need.";
                yield (0, mailSender_1.mailSender)(email, name, message1);
                const email1 = "beta.com.coders@gmail.com";
                yield (0, mailSender_1.mailSender)(email1, name, message);
                res.status(200).json({ message: "Email sent successfully" });
            }
            catch (error) {
                console.error("Error sending email:", error);
                res.status(500).json({ message: "Failed to send email" });
            }
        });
    }
    static getData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield home_model_1.default.findOne({}, {
                    totalContractorsAssociated: 1,
                    totalMessAssociated: 1,
                    totalNgoAssociated: 1,
                    totalStudentsAssociated: 1,
                });
                const response = {
                    totalContractorsAssociated: (data === null || data === void 0 ? void 0 : data.totalContractorsAssociated) || 0,
                    totalMessAssociated: (data === null || data === void 0 ? void 0 : data.totalMessAssociated) || 0,
                    totalNgoAssociated: (data === null || data === void 0 ? void 0 : data.totalNgoAssociated) || 0,
                    totalStudentsAssociated: (data === null || data === void 0 ? void 0 : data.totalStudentsAssociated) || 0,
                };
                res.status(200).json(response);
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
exports.contactController = contactController;
