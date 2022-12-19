import { Book } from "../../models/Book";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateBooksParams {
  title?: string;
  pages?: number;
  genre?: string;
}

export interface IUpdateBooksRepository {
  updateBooks(id: string, params: UpdateBooksParams): Promise<Book>;
}

export interface IUpdateBooksController {
  handle(
    id: string,
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Book | string>>;
}
