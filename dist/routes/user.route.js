"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
// const authMiddleWare = require('../middleware/auth.middleware')
Router.post("/login", user_controller_1.default.login);
Router.get("/:id", user_controller_1.default.getById);
// Router.post('/logout', authMiddleWare, controller.logout)
exports.default = Router;
//# sourceMappingURL=user.route.js.map