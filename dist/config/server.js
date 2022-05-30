"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const product_route_1 = __importDefault(require("../routes/product.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!!!!!");
});
// start the Express server
app.listen(process.env.PORT, () => {
    console.log(`server started at http://localhost:${process.env.PORT}`);
});
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
// Route
app.use('/user', user_route_1.default);
app.use('/product', product_route_1.default);
//# sourceMappingURL=server.js.map