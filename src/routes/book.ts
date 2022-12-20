import express from "express";
import { CreateBookController } from "../controllers/create-book/create-book";
import { GetBooksController } from "../controllers/get-users/get-books";
import { UpdateBooksController } from "../controllers/update-books/update-books";
import { MongoCreateBook } from "../repositories/create-book/mongo-create-book";
import { MongoGetBooks } from "../repositories/get-books/mongo-get-books";
import { MongoUpdateBook } from "../repositories/update-books/mongo-update-books";

export const booksRouter = express.Router();

booksRouter.get("/books", async (req, res) => {
  const mongoGetBooksRespository = new MongoGetBooks();
  const getBookController = new GetBooksController(mongoGetBooksRespository);

  const response = await getBookController.handle();

  res.status(response.statusCode).send(response.body);
});

booksRouter.post("/books", async (req, res) => {
  const mongoCreateBookRepository = new MongoCreateBook();
  const createBookController = new CreateBookController(
    mongoCreateBookRepository
  );
  const response = await createBookController.handle(req);

  res.status(response.statusCode).send(response.body);
});

booksRouter.put("/books/:id", async (req, res) => {
  const MongoUpdateBookRepository = new MongoUpdateBook();
  const updateBooksController = new UpdateBooksController(
    MongoUpdateBookRepository
  );
  const response = await updateBooksController.handle(req);
  res.status(response.statusCode).send(response.body);
});
