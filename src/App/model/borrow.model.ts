import { model, Schema } from "mongoose";

const borrowSchema = new Schema(
  {
    book: String,
    quantity: Number,
    dueDate: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Borrow = model("Borrow", borrowSchema);
