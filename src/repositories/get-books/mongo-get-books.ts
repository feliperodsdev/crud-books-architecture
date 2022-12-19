import { IGetBooksRespository } from "../../controllers/get-users/protocols";
import { Book } from "../../models/Book";

export class MongoGetBooksRespository implements IGetBooksRespository {
  async getBooks(): Promise<Book[]> {
    return [
      {
        title: "Harry Potter",
        author: "JK Rowling",
        pages: 571,
        genre: "Fiction",
      },
    ];
  }
}
