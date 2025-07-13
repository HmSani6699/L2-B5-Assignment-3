import { model, Schema } from "mongoose";
import { BookMethods, IBooks } from "../interface/book.interface";

const bookSchema = new Schema<IBooks, BookMethods>(
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

// Filter book
bookSchema.statics.getFilterBook = async function (
  filter?: string,
  sortBy: string = "createdAt",
  sort: string = "desc",
  limit?: number
) {
  const query: any = {};
  if (filter) {
    query.genre = filter;
  }

  const sortOrder = sort?.toLowerCase() === "asc" ? 1 : -1;

  let queryBuilder = this.find(query).sort({ [sortBy]: sortOrder });

  if (limit && !isNaN(limit)) {
    queryBuilder = queryBuilder.limit(limit);
  }

  return queryBuilder;
};

export const Book = model<IBooks, BookMethods>("Book", bookSchema);
