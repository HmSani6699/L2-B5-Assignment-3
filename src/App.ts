import express, { Request, Response } from "express";
import { Application } from "express-serve-static-core";

export const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(console.log("Hallo world !"));
});
