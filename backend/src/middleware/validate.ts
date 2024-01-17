import type { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpStatus } from "../util/HttpStatus";
import { RequestValidationSchema } from "../validation/RequestValidationSchema";

/**
 * This functions handles the validation of the given request validation schema
 *
 * @param {RequestValidationSchema} schema - The schema object can contain optional body, query, and params keys, each with a Joi schema object
 *
 * @returns Returns an HTTP response 400 BAD REQUEST if a validation error occurs or calls next if no error occurs
 *
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

  const errors = error?.details.map((errorDetail) => ({
    field: errorDetail.path.join(", "),
    message: errorDetail.message,
  }));

  response.status(HttpStatus.BAD_REQUEST).json({ errors });
};

export default validate;
