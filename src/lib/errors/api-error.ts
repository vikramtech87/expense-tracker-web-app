export type ApiErrorCode = "api-error/request-error" | "api-error/parse-error";

export class ApiError extends Error {
    code: ApiErrorCode;

    constructor(code: ApiErrorCode) {
        super(code);
        this.code = code;
    }
}