import { ZodSchema } from "zod"
import { ApiError } from "../errors/api-error"
import { Result } from "../types/result";

type RequestData<T> = {
  method: "GET"
} | {
  method: "POST",
  body: T
} | {
  method: "PUT",
  body: T
} | {
  method: "DELETE"
}

export const performApiRequest = async <T extends {}, U>(
  url: string,
  requestData: RequestData<T>,
  schema: ZodSchema<U>
) => {
  let reqParams: RequestInit | undefined = undefined;

  switch (requestData.method) {
    case "POST":
      reqParams = {
        method: "POST",
        body: JSON.stringify(requestData.body)
      }
      break;
    case "PUT":
      reqParams = {
        method: "PUT",
        body: JSON.stringify(requestData.body)
      }
    case "DELETE":
      reqParams = {
        method: "DELETE"
      }
  }

  const promise = fetch(url, reqParams);
  const result = await resolveFetch(promise, schema);
  return result;
}

const resolveFetch = async <TResponse>(
  responsePromise: Promise<Response>,
  schema: ZodSchema<TResponse>):
  Promise<Result<TResponse, ApiError>> => {
  try {
    const response = await responsePromise;

    if (response.status !== 200) {
      return {
        ok: false,
        error: new ApiError("api-error/request-error"),
      };
    }

    const data = await response.json();
    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
      return {
        ok: false,
        error: new ApiError("api-error/parse-error")
      }
    }

    return {
      ok: true,
      value: parseResult.data
    };
  } catch (error) {
    return {
      ok: false,
      error: new ApiError("api-error/request-error"),
    };
  }
};