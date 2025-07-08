import express, { Request, Response } from "express";
import { Book } from "../model/book.model";

export const borrowRouter = express.Router();

borrowRouter.post("/borrow", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  try {
    const getBookCopies = await Book.findById(book);

    if (getBookCopies && getBookCopies.copies > 0) {
      if (quantity > getBookCopies.copies) {
      } else {
        res.status(200).json({
          success: true,
          message: "This quantity not avilable",
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: "This book is not ",
        data: getBookCopies,
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
