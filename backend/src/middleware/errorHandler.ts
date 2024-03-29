import { NextFunction, Request, Response } from "express";
import { ServiceError } from "../error/ServiceError.js";
import { HttpStatus } from "../util/HttpStatus.js";
import { ApiError } from "../error/ApiError.js";
import { ValidationError } from "../error/ValidationError.js";

/**
 * Handles service errors and sends response with proper http status.
 *
 * @param response Express response object
 * @param error ServiceError
 */
const handleServiceError = (response: Response, error: ServiceError): void => {
  response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    errorCode: error.errorCode,
    message: error.message,
  });
};

/**
 * Handles api errors and sends response with http status code from the
 * ApiError.
 *
 * @param response Express response object
 * @param error ApiError
 */
const handleApiError = (response: Response, error: ApiError): void => {
  response.status(error.httpStatus).json({
    errorCode: error.errorCode,
    message: error.message,
  });
};

/**
 * Handles validation errors and sends response with proper http status.
 *
 * @param response Express response object
 * @param error ValidationError
 */
const handleValidationError = (response: Response, error: ValidationError): void => {
  response.status(HttpStatus.BAD_REQUEST).json({
    errorCode: error.errorCode,
    message: error.message,
    details: error.details,
  });
};

/**
 * Determines the error type and sends proper responses.
 *
 * @param error Error to handle
 * @param request Express request object
 * @param response Express response object
 * @param next Express next function
 */
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
