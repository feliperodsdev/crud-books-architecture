import { Book } from "../../models/Book";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateBookParams,
  ICreateBookController,
  ICreateBookRepository,
} from "./protocols";

export class CreateBookController implements ICreateBookController {
  constructor(private readonly createBookRepository: ICreateBookRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateBookParams>
  ): Promise<HttpResponse<Book>> {
    try {
      const requiredFieldsToCreateBook = ["title", "author", "pages", "genre"];

      for (const field of requiredFieldsToCreateBook) {
        if (!httpRequest?.body?.[field as keyof CreateBookParams]) {
          return {
            statusCode: 400,
            body: `Campos ${field} é necessário`,
          };
        }
      }

      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Nenhum dado enviado",
        };
      }

      const book = await this.createBookRepository.createBook(httpRequest.body);

      return {
        statusCode: 201,
        body: book,
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: "Algo deu errado",
      };
    }
  }
}
