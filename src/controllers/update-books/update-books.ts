import { Book } from "../../models/Book";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateBooksController,
  IUpdateBooksRepository,
  UpdateBooksParams,
} from "./protocols";

export class UpdateBooksController implements IUpdateBooksController {
  constructor(
    private readonly IUpdateBooksRepository: IUpdateBooksRepository
  ) {}
  async handle(
    id: string,
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Book | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id não enviado",
        };
      }

      const allowedFields: (keyof UpdateBooksParams)[] = [
        "title",
        "genre",
        "pages",
      ];

      const someNotAllowedFields = Object.keys(body).some(
        (key) => !allowedFields.includes(key as keyof UpdateBooksParams)
      );

      if (someNotAllowedFields) {
        return {
          statusCode: 400,
          body: "Alguns campos não podem ser atualizados",
        };
      }

      const bookUpdate = await this.IUpdateBooksRepository.updateBooks(
        id,
        body
      );

      return {
        statusCode: 200,
        body: bookUpdate,
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: "Algo deu errado",
      };
    }
  }
}
