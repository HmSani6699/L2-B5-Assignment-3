"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./App/controllers/book.controllers");
const borrow_controller_1 = require("./App/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", book_controllers_1.bookRouter);
app.use("/api", borrow_controller_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Library server");
});
exports.default = app;
