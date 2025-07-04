import express, { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import { bookRouter } from "./App/controllers/book.controllers";

export const app: Application = express();

app.use(express.json());

app.use("/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hallo World");
});
