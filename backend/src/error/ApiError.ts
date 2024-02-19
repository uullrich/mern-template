import { HttpStatus } from "../util/HttpStatus.js";
import { ErrorCode } from "./ErrorCode.js";

export class ApiError extends Error {
  public static build(
    httpStatus: HttpStatus,
    errorCode: ErrorCode,
    message: string,
    details?: Record<string, unknown>,
    childErrors?: Error[],
  ): ApiError {
    return new ApiError(httpStatus, errorCode, message, details, childErrors);
  }

  private constructor(
    public httpStatus: HttpStatus,
    public errorCode: ErrorCode,
    public message: string,
    public details?: Record<string, unknown>,
    public childErrors?: Error[],
  ) {
    super();
  }
}
