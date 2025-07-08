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
exports.bookRouter.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// GET all books
exports.bookRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const books = yield book_model_1.Book.getFilterBook(filter, sortBy, sort, Number(limit));
        res.status(200).json({
            success: true,
            message: books.length > 0 ? "Books retrieved successfully" : "Books Not Found",
            books: books,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book not Found  ..!",
            error: error.errors,
        });
    }
}));
// GET a single book
exports.bookRouter.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    try {
        const book = yield book_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            books: book,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book not Found  ..!",
            error: error.errors,
        });
    }
}));
// UPDATE a single book
exports.bookRouter.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const updateBody = req.body;
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(id, updateBody, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            books: book,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book not Found  ..!",
            error: error.errors,
        });
    }
}));
// Delete a single book
exports.bookRouter.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    try {
        const book = yield book_model_1.Book.findByIdAndDelete(id, { new: true });
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book not Found  ..!",
            error: error.errors,
        });
    }
}));
