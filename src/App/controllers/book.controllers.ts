import express, { Request, Response } from "express";
import { Book } from "../model/book.model";
export const bookRouter = express.Router();

bookRouter.post("/create-book", async (req: Request, res: Response) => {
  const bookBody = req.body;

  try {
    const book = new Book(bookBody);

    await book.save();

    res.status(200).json({
      sussecc: true,
      message: "Book Created successfully ..!",
      book: bookBody,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Book not created",
      error: error.errors,
    });
  }
});
