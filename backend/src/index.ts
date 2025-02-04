import express from "express";
import "dotenv/config";
import cors from "cors";

import { connectDb } from "./config/db";
import userRouter from "./routes/user.route";

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.json({ message: "server is running", success: true });
});

server.listen(process.env.PORT, async () => {
  await connectDb();
  console.log("server is running at http://localhost:4001/");
});
