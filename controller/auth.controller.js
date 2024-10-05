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
exports.AuthController = void 0;
const mailSender_1 = require("../utils/mailSender");
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_util_1 = require("../utils/jwt.util");
const otp_util_1 = require("../utils/otp.util");
const home_model_1 = __importDefault(require("../model/home.model"));
const coupon_model_1 = __importDefault(require("../model/coupon.model"));
class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, rememberMe } = req.body;
            try {
                const user = yield user_model_1.default.findOne({ username });
                if (!user) {
                    res.status(401).json({ message: "Invalid credentials" });
                    return;
                }
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    res.status(401).json({ message: "Invalid credentials" });
                    return;
                }
                // const userId:ObjectId=user._id
                const expiry = rememberMe ? "30d" : "1d";
                const token = (0, jwt_util_1.createToken)(user._id.toString(), username, expiry);
                // console.log(token);
                res.status(200).json({
                    message: "Login successful",
                    token,
                    user: { id: user._id, username: user.username },
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static checkLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    res.status(401).json({ message: "No token provided" });
                    return;
                }
                const decoded = (0, jwt_util_1.verifyToken)(token);
                const user = yield user_model_1.default.findById(decoded.id);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        type: user.type,
                        isVerified: user.isVerified,
                        contractor: user.contractorName,
                        hostelName: user.hostelName,
                        college: user.college,
                        rollNo: user.rollNo
                    },
                    token: token,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, rollNumber, email, hostel, username, password, confirmPassword, collegeName, userType, } = req.body;
            console.log(userType, 'is type');
            if (userType === 'Student') {
                try {
                    const data = yield home_model_1.default.findOne({}, { totalStudentsAssociated: 1 });
                    if (data) {
                        data.totalStudentsAssociated += 1;
                        yield data.save();
                    }
                    else {
                        console.log('No document found.');
                    }
                }
                catch (error) {
                    console.error('Error updating total students:', error);
                }
            }
            else if (userType == 'Contractor') {
                try {
                    const data = yield home_model_1.default.findOne({}, { totalContractorsAssociated: 1 });
                    if (data) {
                        data.totalStudentsAssociated += 1;
                        yield data.save();
                    }
                    else {
                        console.log('No document found.');
                    }
                }
                catch (error) {
                    console.error('Error updating total students:', error);
                }
            }
            // const profileImage = req.file;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            try {
                const newUser = new user_model_1.default({
                    name,
                    rollNo: rollNumber,
                    email,
                    hostelName: hostel,
                    username,
                    password: hashedPassword,
                    confirmPassword,
                    collegeName,
                    type: userType,
                    college: collegeName
                    // profileImage,
                });
                yield newUser.save();
                const userId = newUser._id;
                if (userType === 'Student') {
                    const couponData = new coupon_model_1.default({
                        studentId: userId,
                        contractor: hostel, //will update with their id of contractor in future
                    });
                    yield couponData.save();
                }
                res.status(201).json({ message: "User created successfully!" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error." });
            }
        });
    }
    static sendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                if (!email) {
                    res
                        .status(400)
                        .json({ success: false, message: "Invalid email address." });
                    return;
                }
                //will be enabled in future
                // const user = await User.findOne({ email });
                // if (!user) {
                //   res
                //     .status(404)
                //     .json({
                //       success: false,
                //       message:
                //         "No account found with this email. Please create an account.",
                //     });
                //   return;
                // }
                const otp = (0, otp_util_1.generateOtp)();
                // console.log("otp is ; ",otp)
                const subject = "Email-Verification";
                const message = `Your OTP for Email-Verification is: ${otp}`;
                yield (0, mailSender_1.mailSender)(email, subject, message);
                AuthController.otpStore[email] = {
                    otp,
                    expires: Date.now() + 5 * 60 * 1000,
                };
                res
                    .status(200)
                    .json({ success: true, message: "OTP sent successfully!" });
            }
            catch (e) {
                console.error("Error sending OTP:", e);
                res
                    .status(500)
                    .json({
                    success: false,
                    message: "An error occurred while sending the OTP.",
                });
            }
        });
    }
    static verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                console.log(otp, 'is ');
                if (!email || !otp) {
                    res.status(400).json({ success: false, message: "Email and OTP are required." });
                    return;
                }
                let otpString;
                if (Array.isArray(otp)) {
                    otpString = otp.join("");
                }
                else if (typeof otp === 'number') {
                    otpString = otp.toString();
                }
                else {
                    otpString = otp;
                }
                const storedData = AuthController.otpStore[email];
                if (!storedData) {
                    res.status(404).json({ success: false, message: "No OTP found for this email." });
                    return;
                }
                if (storedData.otp !== otpString) {
                    res.status(400).json({ success: false, message: "Invalid OTP." });
                    return;
                }
                if (Date.now() > storedData.expires) {
                    delete AuthController.otpStore[email];
                    res.status(400).json({ success: false, message: "OTP has expired." });
                    return;
                }
                delete AuthController.otpStore[email];
                res.status(200).json({ success: true, message: "OTP verified successfully." });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An internal server error occurred." });
            }
        });
    }
    static updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, newPassword } = req.body;
            try {
                const user = yield user_model_1.default.findOne({ email, username });
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
                user.password = hashedPassword;
                yield user.save();
                res.status(200).json({ message: "Password updated successfully" });
                return;
            }
            catch (error) {
                console.error("Error updating password:", error);
                res.status(500).json({ message: "Server error" });
                return;
            }
        });
    }
    static userRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id is ', req.body);
                // const userId = req.body
                // const user = await User.findById(userId).select('-password');
                // if (!user) {
                //   return res.status(404).json({ message: 'User not found' });
                // }
                // res.json(user);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.AuthController = AuthController;
AuthController.otpStore = {};
