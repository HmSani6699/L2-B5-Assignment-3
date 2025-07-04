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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../model/book.model");
exports.bookRouter = express_1.default.Router();
// POST a book
exports.bookRouter.post("/create-book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookBody = req.body;
    try {
        const book = new book_model_1.Book(bookBody);
        yield book.save();
        res.status(200).json({
            sussecc: true,
            message: "Book Created successfully ..!",
            book: bookBody,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book not created",
            error: error.errors,
        });
    }
}));
// GET all book
exports.bookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit } = req.query;
    let books = [];
    try {
        if (filter) {
            books = yield book_model_1.Book.find({ genre: filter });
        }
        else if (sortBy && sort) {
            const sortValue = sort === "asc" ? 1 : -1;
            const numericLimit = Number(limit);
            if (limit) {
                books = yield book_model_1.Book.find()
                    .sort({ createdAt: sortValue })
                    .limit(numericLimit);
            }
            else {
                books = yield book_model_1.Book.find().sort({ createdAt: sortValue });
            }
        }
        else {
            books = yield book_model_1.Book.find();
        }
        if (books.length > 0) {
            res.status(200).json({
                sussecc: true,
                message: " Get all Books successfully ..!",
                books,
            });
        }
        else {
            res.status(200).json({
                sussecc: true,
                message: "Books is not found ..!",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book not created",
            error: error.errors,
        });
    }
}));
