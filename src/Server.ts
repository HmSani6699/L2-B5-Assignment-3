import { Server } from "http";
import mongoose from "mongoose";
import app from "./App";

let server: Server;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://sadiq:devsadiq6699@cluster0.2wuqxlq.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0"
    );

    server = app.listen(PORT, async () => {
      console.log("✅ Server is runing on the port: 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
