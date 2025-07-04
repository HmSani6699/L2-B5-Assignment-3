import { model, Schema } from "mongoose";
import { IBooks } from "../interface/book.interface";

const bookSchema = new Schema<IBooks>(
  {
    title: String,
    auther: String,
    genre: {
      type: String,
      enum: [
        "FANTASY",
        "BIOGRAPHY",
        "HISTORY",
        "SCIENCE",
        "NON_FICTION",
        "FICTION",
      ],
    },
    isbn: String,
    decription: String,
    copies: Number,
    available: Boolean,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
