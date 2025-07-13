import { model, Schema } from "mongoose";
import { Book } from "./book.model";

const borrowSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.pre("save", async function (next) {
  // 'this' is a Mongoose document, so access properties directly
  const borrowDoc = this as any;

  const foundBook = await Book.findById(borrowDoc.book);
  if (!foundBook) return next(new Error("Book not found"));

  if (foundBook.copies < borrowDoc.quantity) {
    return next(new Error("Not enough copies available"));
  }

  // Update book copies & availability
  foundBook.copies -= borrowDoc.quantity;
  if (foundBook.copies <= 0) {
    foundBook.copies = 0;
    foundBook.available = false;
  }
  await foundBook.save();

  next();
});

borrowSchema.post("save", function (doc) {
  console.log(`Borrow saved: Book ${doc.book} - Quantity: ${doc.quantity}`);
});

export const Borrow = model("Borrow", borrowSchema);
