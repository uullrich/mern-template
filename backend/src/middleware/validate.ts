import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { RequestValidationSchema } from "../validation/RequestValidationSchema.js";
import { ErrorCode } from "../error/ErrorCode.js";
import { ValidationError } from "../error/ValidationError.js";

/**
 * This functions handles the validation of the given request validation schema.
 * Throws an ValidationError on validation error which is handled in the errorHandler middleware.
 *
 * @param {RequestValidationSchema} schema The schema object can contain optional body, query, and params keys, each with a Joi schema object
 */
const validate = (schema: RequestValidationSchema) => (request: Request, response: Response, next: NextFunction) => {
  const { body, query, params } = request;

  const { error } = Joi.object(schema).validate(
    {
      body,
      query,
      params,
    },
    { abortEarly: false, stripUnknown: true },
  );

  if (!error) {
    next();
    return;
  }

  const validationErrorDetails = error?.details.map((errorDetail) => ({
    field: errorDetail.path.join(", "),
    message: errorDetail.message,
  }));
  throw ValidationError.build(ErrorCode.VALIDATION_ERROR, "Validation error", validationErrorDetails);
};

export default validate;
