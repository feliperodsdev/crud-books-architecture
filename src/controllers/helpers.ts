import { HttpResponse } from "./protocols";

export const badRequest = (msg: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: msg,
  };
};

export const ok = <T>(msg: any): HttpResponse<T> => {
  return {
    statusCode: 400,
    body: msg,
  };
};

export const created = <T>(data: any): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: "Algo deu errado",
  };
};
