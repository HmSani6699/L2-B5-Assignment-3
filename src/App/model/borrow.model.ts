import { model, Schema } from "mongoose";

const borrowSchema = new Schema({
  book: String,
  quantity: Number,
  dueDate: Date,
});

export const Borrow = model("Borrow", borrowSchema);
