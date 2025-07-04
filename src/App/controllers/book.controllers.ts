import express, { Request, Response } from "express";
import { Book } from "../model/book.model";
export const bookRouter = express.Router();

// POST a book
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

// GET all book
bookRouter.get("/", async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit } = req.query;

  let books = [];

  try {
    if (filter) {
      books = await Book.find({ genre: filter });
    } else if (sortBy && sort) {
      const sortValue = sort === "asc" ? 1 : -1;
      const numericLimit = Number(limit);

      if (limit) {
        books = await Book.find()
          .sort({ createdAt: sortValue })
          .limit(numericLimit);
      } else {
        books = await Book.find().sort({ createdAt: sortValue });
      }
    } else {
      books = await Book.find();
    }

    if (books.length > 0) {
      res.status(200).json({
        sussecc: true,
        message: " Get all Books successfully ..!",
        books,
      });
    } else {
      res.status(200).json({
        sussecc: true,
        message: "Books is not found ..!",
      });
    }
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Book not created",
      error: error.errors,
    });
  }
});
