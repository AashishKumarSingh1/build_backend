"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRouter = void 0;
const express_1 = require("express");
const student_controller_1 = require("../controller/student.controller");
class StudentRouter {
    static student() {
        const router = (0, express_1.Router)();
        router.route('/getPayment/:id').get(student_controller_1.StudentController.getPayment);
        router.post('/savePrice/:id', student_controller_1.StudentController.savePayment);
        return router;
    }
}
exports.StudentRouter = StudentRouter;
