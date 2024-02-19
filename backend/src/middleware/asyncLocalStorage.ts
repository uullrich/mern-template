import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import asyncLocalStorage, { RequestStore } from "../util/AsyncLocalStorage.js";

/**
 * Load the request store with data.
 *
 * @param request Express request object
 * @param response Express response object
 * @param next Express next function
 */
const asyncLocalStorageMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  const requestStore: RequestStore = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    requestId: (request.headers["x-request-id"] as string) || v4(),
  };

  asyncLocalStorage.run(requestStore, () => {
    next();
  });
};

export default asyncLocalStorageMiddleware;
