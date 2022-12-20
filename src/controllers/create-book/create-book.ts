import { Book } from "../../models/Book";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateBookParams, ICreateBookRepository } from "./protocols";

export class CreateBookController implements IController {
  constructor(private readonly createBookRepository: ICreateBookRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateBookParams>
  ): Promise<HttpResponse<Book | string>> {
    try {
      const requiredFieldsToCreateBook = ["title", "author", "pages", "genre"];

      for (const field of requiredFieldsToCreateBook) {
        if (!httpRequest?.body?.[field as keyof CreateBookParams]) {
          return badRequest(`Campo ${field} não foi enviado`);
        }
      }

      if (!httpRequest.body) {
        return badRequest("Nenhum dado enviado");
      }

      const book = await this.createBookRepository.createBook(httpRequest.body);

      return created<Book>(book);
    } catch (e) {
      return serverError();
    }
  }
}
