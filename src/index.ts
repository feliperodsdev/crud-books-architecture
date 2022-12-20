import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { booksRouter } from "./routes/book";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  app.use("/", booksRouter);
  await MongoClient.connect();

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log("Server is running!"));
};
main();
