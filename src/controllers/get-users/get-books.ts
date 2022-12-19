import { IGetBooksController, IGetBooksRespository } from "./protocols";
import { HttpResponse } from "../protocols";
import { Book } from "../../models/Book";

export class GetBooksController implements IGetBooksController {
  constructor(private readonly IGetBooksRepository: IGetBooksRespository) {}
  async handle(): Promise<HttpResponse<Book[] | string>> {
    try {
      //validar requisição
      //direcionar para banco de dados
      const books = await this.IGetBooksRepository.getBooks();

      return {
        statusCode: 500,
        body: books,
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: "Não foi possível retornar a lista de livros",
      };
    }
  }
}
