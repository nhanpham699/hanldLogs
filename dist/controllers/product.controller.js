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
const product_model_1 = __importDefault(require("../models/product.model"));
exports.default = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.default.find();
            res.status(200).json({
                code: "00000",
                message: "success",
                data: products,
            });
        }
        catch (error) {
            console.log(error.message);
        }
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.findOne({ _id: req.params.id });
            if (!product) {
                throw Error("The product is not found!");
            }
            res.status(200).json({
                code: "00000",
                message: "success",
                data: product,
            });
        }
        catch (error) {
            res.status(200).json({
                code: "00099",
                message: error.message,
            });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = new product_model_1.default(req.body.data);
            yield product.save();
            const resData = Object.assign(Object.assign({}, req.body), { data: Object.assign(Object.assign({}, req.body.data), { _id: product._id.toString() }) });
            if (product) {
                res.status(200).json({
                    code: "00000",
                    message: "success",
                    request: req.body,
                    data: resData,
                });
            }
        }
        catch (error) {
            res.status(200).json({
                code: "00099",
                message: error.message,
                request: req.body,
            });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.default.deleteOne(req.body.data);
            console.log(products);
            if (!products.deletedCount) {
                throw Error("Delete failed!");
            }
            res.status(200).json({
                code: "00000",
                message: "success",
                request: req.body,
            });
        }
        catch (error) {
            res.status(200).json({
                code: "00099",
                message: error.message,
                request: req.body,
            });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = req.body;
            delete req.body._id;
            const result = yield product_model_1.default.updateOne({ _id }, req.body);
            if (result.acknowledged) {
                res.status(200).json({
                    code: "00000",
                    message: "success",
                });
            }
        }
        catch (error) {
            res.status(200).json({
                code: "00099",
                message: error.message,
            });
        }
    }),
};
//# sourceMappingURL=product.controller.js.map