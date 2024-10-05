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
exports.resetDailyCoupons = resetDailyCoupons;
const node_cron_1 = __importDefault(require("node-cron"));
const coupon_model_1 = __importDefault(require("../model/coupon.model"));
function resetDailyCoupons() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coupons = yield coupon_model_1.default.find();
            for (const coupon of coupons) {
                coupon.monthlySpent += coupon.todaysSpent;
                coupon.yearlySpent += coupon.todaysSpent;
                coupon.todaysSpent = 0;
                yield coupon.save();
            }
        }
        catch (error) {
            console.error("Error resetting daily coupons: ", error);
        }
    });
}
node_cron_1.default.schedule('0 0 * * *', resetDailyCoupons);
