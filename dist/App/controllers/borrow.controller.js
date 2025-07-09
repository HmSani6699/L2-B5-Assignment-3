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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../model/book.model");
const borrow_model_1 = require("../model/borrow.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    try {
        const getBookCopies = yield book_model_1.Book.findById(book);
        if (getBookCopies && getBookCopies.copies > 0) {
            if (getBookCopies.copies > quantity) {
                // post korbes
                const borrowBook = new borrow_model_1.Borrow({ book, quantity, dueDate });
                yield borrowBook.save();
                res.status(200).json({
                    success: true,
                    message: "Book borrowed successfully",
                    data: borrowBook,
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "This quantity not available",
                });
            }
        }
        else {
            yield book_model_1.Book.findByIdAndUpdate(book, {
                available: false,
            });
            res.status(200).json({
                success: true,
                message: "This book is not available",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Borrow not Found  ..!",
            error: error.errors,
        });
    }
}));
