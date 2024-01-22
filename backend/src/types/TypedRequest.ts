import type { Request } from "express";
import type { DeepPartial } from "utility-types";

// More strictly typed Express.Request type
export type TypedRequest<RequestBody = Record<string, unknown>, QueryString = Record<string, unknown>> = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  //As we do a validation for every body we can make sure that it is the given type
  RequestBody,
  DeepPartial<QueryString>
>;
