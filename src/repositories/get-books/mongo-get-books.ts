import { IGetBooksRespository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { Book } from "../../models/Book";

export class MongoGetBooksRespository implements IGetBooksRespository {
  async getBooks(): Promise<Book[]> {
    const books = await MongoClient.db
      .collection<Omit<Book, "id">>("books")
      .find({})
      .toArray();
    return books.map(({ _id, ...book }) => ({
      ...book,
      id: _id.toHexString(),
    }));
  }
}
