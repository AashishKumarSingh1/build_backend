"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const express_1 = require("express");
const home_controller_1 = require("../controller/home.controller");
class home {
    static home() {
        const router = (0, express_1.Router)();
        router.route('/contact/send').post(home_controller_1.contactController.contact);
        router.route("/getData").get(home_controller_1.contactController.getData);
        return router;
    }
}
exports.home = home;
