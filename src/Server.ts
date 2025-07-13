import { Server } from "http";
import { app } from "./App";
import mongoose from "mongoose";

let server: Server;
const PORT = 5000;

async function main() {
  try {
    server = app.listen(PORT, async () => {
      console.log("✅ Server is runing on the port: 5000");

      await mongoose.connect(
        "mongodb+srv://sadiq:devsadiq6699@cluster0.2wuqxlq.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("✅ Database is connect");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
