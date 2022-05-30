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
// import validator from "validator"
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const SECRET_KEY = process.env.SECRET_KEY;
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, SECRET_KEY);
        return token;
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcryptjs_1.default.hash(user.password, 8);
        }
        next();
    });
});
userSchema.statics.findByCredentials = function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield this.findOne({ username });
            if (!user) {
                throw Error("User is not found");
            }
            const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordMatch) {
                throw Error("Password is incorrect");
            }
            return user;
        }
        catch (error) {
            console.log(error.message);
            return false;
        }
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map