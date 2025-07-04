"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: String,
    auther: String,
    genre: {
        type: String,
        enum: [
            "FANTASY",
            "BIOGRAPHY",
            "HISTORY",
            "SCIENCE",
            "NON_FICTION",
            "FICTION",
        ],
    },
    isbn: String,
    decription: String,
    copies: Number,
    available: Boolean,
}, {
    versionKey: false,
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
