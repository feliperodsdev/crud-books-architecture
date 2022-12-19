import express from "express";
import { config } from "dotenv";
import { GetBooksController } from "./controllers/get-users/get-books";
import { MongoGetBooksRespository } from "./repositories/get-books/mongo-get-books";

config();

const app = express();

const port = process.env.PORT || 5000;

app.get("/books", async (req, res) => {
  const mongoGetBooksRespository = new MongoGetBooksRespository();
  const getBookController = new GetBooksController(mongoGetBooksRespository);

  const response = await getBookController.handle();

  res.status(response.statusCode).send(response.body);
});

app.listen(port, () => console.log("Server is running!"));
