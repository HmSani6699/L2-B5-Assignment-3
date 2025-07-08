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

// GET all books
bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const books = await Book.getFilterBook(
      filter as string,
      sortBy as string,
      sort as string,
      Number(limit)
    );

    res.status(200).json({
      success: true,
      message:
        books.length > 0 ? "Books retrieved successfully" : "Books Not Found",
      books: books,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Book not Found  ..!",
      error: error.errors,
    });
  }
});

// GET a single book
bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  const id = req.params.bookId;

  try {
    const book = await Book.findById(id);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      books: book,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Book not Found  ..!",
      error: error.errors,
    });
  }
});

// UPDATE a single book
bookRouter.put("/:bookId", async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const updateBody = req.body;

  try {
    const book = await Book.findByIdAndUpdate(id, updateBody, { new: true });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      books: book,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Book not Found  ..!",
      error: error.errors,
    });
  }
});

// Delete a single book
bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  const id = req.params.bookId;

  try {
    const book = await Book.findByIdAndDelete(id, { new: true });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Book not Found  ..!",
      error: error.errors,
    });
  }
});
