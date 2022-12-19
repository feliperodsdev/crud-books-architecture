import { Book } from "../../models/Book";
import { HttpRequest, HttpResponse } from "../protocols";

export interface CreateBookParams {
  title: string;
  author: string;
  pages: number;
  genre: string;
}

export interface ICreateBookRepository {
  createBook(params: CreateBookParams): Promise<Book>;
}

export interface ICreateBookController {
  handle(
    httpRequest: HttpRequest<CreateBookParams>
  ): Promise<HttpResponse<Book>>;
}
