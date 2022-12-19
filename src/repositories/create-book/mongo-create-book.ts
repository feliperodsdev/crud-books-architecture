import {
  CreateBookParams,
  ICreateBookRepository,
} from "../../controllers/create-book/protocols";
import { MongoClient } from "../../database/mongo";
import { Book } from "../../models/Book";

export class MongoCreateBook implements ICreateBookRepository {
  async createBook(params: CreateBookParams): Promise<Book> {
    const { insertedId } = await MongoClient.db
      .collection("books")
      .insertOne(params);

    const book = await MongoClient.db
      .collection<Omit<Book, "id">>("books")
      .findOne({ _id: insertedId });

    if (!book) {
      throw new Error("Book not created");
    }
    const { _id, ...rest } = book;

    return { id: _id.toHexString(), ...rest };
  }
}
