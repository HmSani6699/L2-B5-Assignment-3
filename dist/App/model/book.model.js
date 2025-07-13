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
// Filter book
bookSchema.statics.getFilterBook = function (filter_1) {
    return __awaiter(this, arguments, void 0, function* (filter, sortBy = "createdAt", sort = "desc", limit) {
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOrder = (sort === null || sort === void 0 ? void 0 : sort.toLowerCase()) === "asc" ? 1 : -1;
        let queryBuilder = this.find(query).sort({ [sortBy]: sortOrder });
        if (limit && !isNaN(limit)) {
            queryBuilder = queryBuilder.limit(limit);
        }
        return queryBuilder;
    });
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
