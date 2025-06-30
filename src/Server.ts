import { Server } from "http";
import { app } from "./App";

const PORT = 5000;

let server: Server;

async function main() {
  try {
    server = app.listen(PORT, () => {
      console.log("✅ Server is runing on the port: 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
