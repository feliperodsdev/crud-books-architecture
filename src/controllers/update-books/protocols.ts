import { Book } from "../../models/Book";

export interface UpdateBooksParams {
  title?: string;
  pages?: number;
  genre?: string;
}

export interface IUpdateBooksRepository {
  updateBooks(id: string, params: UpdateBooksParams): Promise<Book>;
}
