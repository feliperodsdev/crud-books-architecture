import { Book } from "../../models/Book";

export interface CreateBookParams {
  title: string;
  author: string;
  pages: number;
  genre: string;
}

export interface ICreateBookRepository {
  createBook(params: CreateBookParams): Promise<Book>;
}
