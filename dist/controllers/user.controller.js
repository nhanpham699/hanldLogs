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
const user_model_1 = __importDefault(require("../models/user.model"));
// const auth = require("../middleware/auth.middleware")
exports.default = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqData = {
            requestId: req.body.requestId,
            requestTime: req.body.requestTime,
        };
        try {
            const username = req.body.data.username;
            const password = req.body.data.password;
            const user = yield user_model_1.default.findByCredentials(username, password);
            if (!user) {
                return res.status(401).json({
                    code: "00009",
                    message: "Login failed! Check authentication credentials",
                    request: reqData,
                });
            }
            const token = yield user.generateAuthToken();
            res.status(200).json({
                code: "00000",
                message: "success",
                request: reqData,
                data: { token },
            });
        }
        catch (error) {
            res.status(200).json({
                code: "00099",
                message: error.message,
                request: reqData,
            });
        }
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ _id: req.params.id });
            res.json(user);
        }
        catch (error) {
            res.send({ error: true });
        }
    }),
};
//# sourceMappingURL=user.controller.js.map