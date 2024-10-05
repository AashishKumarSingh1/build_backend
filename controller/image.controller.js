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
exports.imageController = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const dotenv_config_1 = require("../config/dotenv.config");
(0, dotenv_config_1.loadEnv)();
cloudinary_config_1.default.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class imageController {
    static getUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let images = [];
                if (typeof req.body.images === 'string') {
                    images = [req.body.images];
                }
                else if (Array.isArray(req.body.images)) {
                    images = req.body.images;
                }
                else {
                    res.status(400).json({ message: "Invalid input format for images" });
                    return;
                }
                const imageLinks = [];
                for (const image of images) {
                    if (typeof image !== "string") {
                        res.status(400).json({ message: "Invalid image path or URL" });
                        return;
                    }
                    try {
                        const result = yield cloudinary_config_1.default.uploader.upload(image, {
                            folder: "Images",
                        });
                        imageLinks.push({
                            url: result.secure_url,
                        });
                    }
                    catch (uploadError) {
                        console.log("Error while uploading the image:", uploadError.message);
                        res.status(500).json({ message: "Error uploading an image", error: uploadError });
                        return;
                    }
                }
                res.status(200).json({
                    message: "Files uploaded successfully",
                    urls: imageLinks,
                });
            }
            catch (err) {
                console.log("Error while processing the images:", err.message);
                res.status(500).json({ message: "Internal server error", error: err });
            }
        });
    }
}
exports.imageController = imageController;
