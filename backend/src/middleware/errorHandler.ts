import { NextFunction, Request, Response } from "express";
import { ServiceError } from "../error/ServiceError";
import { HttpStatus } from "../util/HttpStatus";
import { ApiError } from "../error/ApiError";
import { ValidationError } from "../error/ValidationError";

const handleServiceError = (response: Response, error: ServiceError): void => {
  response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    errorCode: error.errorCode,
    message: error.message,
  });
};

const handleApiError = (response: Response, error: ApiError): void => {
  response.status(error.httpsStatus).json({
    errorCode: error.errorCode,
    message: error.message,
  });
};

const handleValidationError = (response: Response, error: ValidationError): void => {
  response.status(HttpStatus.BAD_REQUEST).json({
    errorCode: error.errorCode,
    message: error.message,
    details: error.details,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof ServiceError) {
    handleServiceError(response, error);
  } else if (error instanceof ApiError) {
    handleApiError(response, error);
  } else if (error instanceof ValidationError) {
    handleValidationError(response, error);
  }
};

export default errorHandler;
