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
const borrow_model_1 = require("../model/borrow.model");
exports.borrowRouter = express_1.default.Router();
// Post a borrow book
exports.borrowRouter.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    try {
        // const getBookCopies = await Book.findById(book);
        // if (getBookCopies && getBookCopies.copies > 0) {
        //   if (getBookCopies.copies >= quantity) {
        //     // post korbes
        //     const borrowBook = new Borrow({ book, quantity, dueDate });
        //     await borrowBook.save();
        //     const updateBookCopiesNumber = getBookCopies.copies - quantity;
        //     if (updateBookCopiesNumber === 0) {
        //       await Book.findByIdAndUpdate(book, {
        //         copies: updateBookCopiesNumber,
        //         available: false,
        //       });
        //     } else {
        //       await Book.findByIdAndUpdate(book, {
        //         copies: updateBookCopiesNumber,
        //       });
        //     }
        //     res.status(200).json({
        //       success: true,
        //       message: "Book borrowed successfully",
        //       data: borrowBook,
        //     });
        //   } else {
        //     res.status(200).json({
        //       success: true,
        //       message: "This quantity not available",
        //     });
        //   }
        // } else {
        //   await Book.findByIdAndUpdate(book, {
        //     available: false,
        //   });
        // res.status(200).json({
        //   success: true,
        //   message: "This book is not available",
        // });
        // }
        const borrow = new borrow_model_1.Borrow({ book, quantity, dueDate });
        yield borrow.save();
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error.errors,
        });
    }
}));
// Get all borrowed books summary
exports.borrowRouter.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllBook = yield borrow_model_1.Borrow.aggregate([
            // Convert string `book` to ObjectId
            {
                $addFields: {
                    bookObjId: { $toObjectId: "$book" },
                },
            },
            // Group by book ID and sum quantity
            {
                $group: {
                    _id: "$bookObjId",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            // Lookup book details from books collection
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            { $unwind: "$book" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: getAllBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Borrow not Found ..!",
            error: error.message || error,
        });
    }
}));
