import { HttpStatus } from "../util/HttpStatus";
import { ErrorCode } from "./ErrorCode";

export class ApiError extends Error {
  public static build(
    httpsStatus: HttpStatus,
    errorCode: ErrorCode,
    message: string,
    details?: Record<string, unknown>,
    childErrors?: Error[],
  ): ApiError {
    return new ApiError(httpsStatus, errorCode, message, details, childErrors);
  }

  private constructor(
    public httpsStatus: HttpStatus,
    public errorCode: ErrorCode,
    public message: string,
    public details?: Record<string, unknown>,
    public childErrors?: Error[],
  ) {
    super();
  }
}
