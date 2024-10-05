"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const express_1 = require("express");
const image_controller_1 = require("../controller/image.controller");
class image {
    static getImageUrl() {
        const router = (0, express_1.Router)();
        router.route('/get_url').get(image_controller_1.imageController.getUrl);
        return router;
    }
}
exports.image = image;
