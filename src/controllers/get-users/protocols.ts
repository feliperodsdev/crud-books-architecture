import { Book } from "../../models/Book";

export interface IGetBooksRespository {
  getBooks(): Promise<Book[]>;
}
