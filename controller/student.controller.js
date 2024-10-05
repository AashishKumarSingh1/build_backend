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
exports.StudentController = void 0;
const payment_model_1 = __importDefault(require("../model/payment.model"));
const payment_model_2 = __importDefault(require("../model/payment.model"));
class StudentController {
    static getPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const details = yield payment_model_1.default.find({ user: id }, { items: 1, totalAmount: 1, createdAt: 1 });
                if (!details.length) {
                    res.status(404).json({ message: "Payments not found" });
                    return;
                }
                res.status(200).json(details);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static savePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { items, totalAmount } = req.body;
                const userId = req.params.id;
                console.log('adafa');
                const newPayment = new payment_model_2.default({
                    user: userId,
                    items,
                    totalAmount,
                });
                yield newPayment.save();
                res.status(201).json({ message: 'Payment saved successfully', payment: newPayment });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.StudentController = StudentController;
