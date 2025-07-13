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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
}, {
    versionKey: false,
    timestamps: true,
});
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 'this' is a Mongoose document, so access properties directly
        const borrowDoc = this;
        const foundBook = yield book_model_1.Book.findById(borrowDoc.book);
        if (!foundBook)
            return next(new Error("Book not found"));
        if (foundBook.copies < borrowDoc.quantity) {
            return next(new Error("Not enough copies available"));
        }
        // Update book copies & availability
        foundBook.copies -= borrowDoc.quantity;
        if (foundBook.copies <= 0) {
            foundBook.copies = 0;
            foundBook.available = false;
        }
        yield foundBook.save();
        next();
    });
});
borrowSchema.post("save", function (doc) {
    console.log(`Borrow saved: Book ${doc.book} - Quantity: ${doc.quantity}`);
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
