"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: String,
    quantity: Number,
    dueDate: Date,
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
