import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import { AppConfig, LogLevel } from "../model/AppConfig";
import Logger from "../util/Logger";

const generateRequestId = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return v4() as string;
};

const startRequestLog = (request: Request, logLevel: LogLevel, requestId: string): void => {
  const { method, originalUrl, body } = request;

  if (logLevel === LogLevel.DEBUG) {
    Logger.debug({
      message: "start request",
      method,
      url: originalUrl,
      requestId,
      body: body as unknown,
    });
    return;
  }

  Logger.info({ message: "start request", method, url: originalUrl, requestId });
};

const endRequestLog = (
  request: Request,
  response: Response,
  logLevel: LogLevel,
  durationInMs: number,
  requestId: string,
): void => {
  const { method, originalUrl } = request;

  if (logLevel === LogLevel.DEBUG) {
    Logger.debug({
      message: "end request",
      method: method,
      url: originalUrl,
      requestId,
      responseHeaders: response.getHeaders(),
      durationInMs,
    });
    return;
  }

  Logger.info({ message: "end request", method, url: originalUrl, requestId, durationInMs });
};

const requestLogging =
  (appConfig: AppConfig) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const { logLevel } = appConfig;
    const requestId = (request.headers["x-request-id"] as string) || generateRequestId();

    const startDate = new Date();
    startRequestLog(request, logLevel, requestId);

    next();

    const requestDurationInMs = Date.now() - startDate.getTime();
    endRequestLog(request, response, logLevel, requestDurationInMs, requestId);
  };

export default requestLogging;
