import { Book } from "../../models/Book";
import { HttpResponse } from "../protocols";

export interface IGetBooksController {
  handle(): Promise<HttpResponse<Book[] | string>>;
}

export interface IGetBooksRespository {
  getBooks(): Promise<Book[]>;
}
