"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(process.env.URL_MONGODB)
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log("err: " + err));
module.exports = mongoose_1.default;
//# sourceMappingURL=mongodb.js.map