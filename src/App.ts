import express, { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import { bookRouter } from "./App/controllers/book.controllers";
import { borrowRouter } from "./App/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

app.use("/api", bookRouter);

app.use("/api", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library server");
});

export default app;
