import express, { Request, Response } from "express";
import { Borrow } from "../model/borrow.model";

export const borrowRouter = express.Router();

// Post a borrow book
borrowRouter.post("/borrow", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  try {
    const borrow = new Borrow({ book, quantity, dueDate });
    await borrow.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.errors,
    });
  }
});

// Get all borrowed books summary
borrowRouter.get("/borrow", async (req: Request, res: Response) => {
  try {
    const getAllBook = await Borrow.aggregate([
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Borrow not Found ..!",
      error: error.message || error,
    });
  }
});
