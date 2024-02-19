import { ErrorCode } from "./ErrorCode.js";

type ValidationErrorDetails = {
  field: string;
  message: string;
}[];

export class ValidationError extends Error {
  public static build(errorCode: ErrorCode, message: string, details: ValidationErrorDetails): ValidationError {
    return new ValidationError(errorCode, message, details);
  }

  private constructor(
    public errorCode: ErrorCode,
    public message: string,
    public details: ValidationErrorDetails,
  ) {
    super();
  }
}
