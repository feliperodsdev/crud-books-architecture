import { ObjectId } from "mongodb";
import {
  IUpdateBooksRepository,
  UpdateBooksParams,
} from "../../controllers/update-books/protocols";
import { MongoClient } from "../../database/mongo";
import { Book } from "../../models/Book";

export class MongoUpdateBook implements IUpdateBooksRepository {
  async updateBooks(id: string, params: UpdateBooksParams): Promise<Book> {
    await MongoClient.db.collection("books").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const book = await MongoClient.db
      .collection<Omit<Book, "id">>("books")
      .findOne({ _id: new ObjectId(id) });

    if (!book) {
      throw new Error("Book not updated");
    }

    const { _id, ...rest } = book;

    return { id: _id.toHexString(), ...rest };
  }
}
