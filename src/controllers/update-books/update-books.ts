import { Book } from "../../models/Book";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateBooksRepository, UpdateBooksParams } from "./protocols";

export class UpdateBooksController implements IController {
  constructor(
    private readonly IUpdateBooksRepository: IUpdateBooksRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateBooksParams>
  ): Promise<HttpResponse<Book | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id || !body) {
        return badRequest("ID ou Body não enviados");
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
        return badRequest("Alguns campos não podem ser atualizados");
      }

      const bookUpdate = await this.IUpdateBooksRepository.updateBooks(
        id,
        body
      );

      return ok<Book>(bookUpdate);
    } catch (e) {
      return serverError();
    }
  }
}
