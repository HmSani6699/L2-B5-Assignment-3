import express, { Request, Response } from "express";
import { Book } from "../model/book.model";
import { Borrow } from "../model/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post("/borrow", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  try {
    const getBookCopies = await Book.findById(book);

    if (getBookCopies && getBookCopies.copies > 0) {
      if (getBookCopies.copies > quantity) {
        // post korbes
        const borrowBook = new Borrow({ book, quantity, dueDate });
        await borrowBook.save();
        res.status(200).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrowBook,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "This quantity not available",
        });
      }
    } else {
      await Book.findByIdAndUpdate(book, {
        available: false,
      });
      res.status(200).json({
        success: true,
        message: "This book is not available",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Borrow not Found  ..!",
      error: error.errors,
    });
  }
});
