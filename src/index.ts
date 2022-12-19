import express from "express";
import { config } from "dotenv";
import { GetBooksController } from "./controllers/get-users/get-books";
import { MongoGetBooks } from "./repositories/get-books/mongo-get-books";
import { MongoClient } from "./database/mongo";
import { MongoCreateBook } from "./repositories/create-book/mongo-create-book";
import { CreateBookController } from "./controllers/create-book/create-book";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  const port = process.env.PORT || 5000;

  app.get("/books", async (req, res) => {
    const mongoGetBooksRespository = new MongoGetBooks();
    const getBookController = new GetBooksController(mongoGetBooksRespository);

    const response = await getBookController.handle();

    res.status(response.statusCode).send(response.body);
  });

  app.post("/books", async (req, res) => {
    const mongoCreateBookRepository = new MongoCreateBook();
    const createBookController = new CreateBookController(
      mongoCreateBookRepository
    );
    const response = await createBookController.handle(req);

    res.status(response.statusCode).send(response.body);
  });

  app.listen(port, () => console.log("Server is running!"));
};
main();
