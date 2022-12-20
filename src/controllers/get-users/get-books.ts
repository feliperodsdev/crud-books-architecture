import { IGetBooksRespository } from "./protocols";
import { HttpResponse, IController } from "../protocols";
import { Book } from "../../models/Book";
import { ok, serverError } from "../helpers";

export class GetBooksController implements IController {
  constructor(private readonly IGetBooksRepository: IGetBooksRespository) {}
  async handle(): Promise<HttpResponse<Book[] | string>> {
    try {
      //validar requisição
      //direcionar para banco de dados
      const books = await this.IGetBooksRepository.getBooks();

      return ok<Book[]>(books);
    } catch (e) {
      console.log(e);
      return serverError();
    }
  }
}
