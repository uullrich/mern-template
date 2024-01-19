import { ErrorCode } from "./ErrorCode";

export class ServiceError extends Error {
  public static build(
    errorCode: ErrorCode,
    message: string,
    details?: Record<string, unknown>,
    childErrors?: Error[],
  ): ServiceError {
    return new ServiceError(errorCode, message, details, childErrors);
  }

  private constructor(
    public errorCode: ErrorCode,
    public message: string,
    public details?: Record<string, unknown>,
    public childErrors?: Error[],
  ) {
    super();
  }
}
