"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const multer_1 = __importDefault(require("multer"));
class auth {
    static auth() {
        const router = (0, express_1.Router)();
        router.route("/login").post(auth_controller_1.AuthController.login);
        router.route("/checklogin").get(auth_controller_1.AuthController.checkLogin);
        router.route("/sendOtp").post(auth_controller_1.AuthController.sendOtp);
        router.route("/verifyOtp").post(auth_controller_1.AuthController.verifyOtp);
        router.route("/updatePassword").post(auth_controller_1.AuthController.updatePassword);
        router.route("/user").get(auth_controller_1.AuthController.userRoute);
        const storage = multer_1.default.memoryStorage();
        const upload = (0, multer_1.default)({ storage });
        router
            .route("/signup")
            .post(upload.single("profileImage"), auth_controller_1.AuthController.signUp);
        return router;
    }
}
exports.auth = auth;
