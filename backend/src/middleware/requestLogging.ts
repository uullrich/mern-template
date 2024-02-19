import { NextFunction, Request, Response } from "express";
import { AppConfig, LogLevel } from "../model/AppConfig.js";
import Logger from "../util/Logger.js";

/**
 * Logs a start entry with details based on the log level.
 *
 * @param request Express request object
 * @param logLevel Current log level
 */
const startRequestLog = (request: Request, logLevel: LogLevel): void => {
  const { method, originalUrl, body } = request;

  if (logLevel === LogLevel.DEBUG) {
    Logger.debug({
      message: "start request",
      method,
      url: originalUrl,
      body: body as unknown,
    });
    return;
  }

  Logger.info({ message: "start request", method, url: originalUrl });
};

/**
 * Logs an end entry with details based on the log level.
 *
 * @param request Express request object
 * @param response Express response object
 * @param logLevel Current log level
 * @param durationInMs Code execution duration
 */
const endRequestLog = (request: Request, response: Response, logLevel: LogLevel, durationInMs: number): void => {
  const { method, originalUrl } = request;

  if (logLevel === LogLevel.DEBUG) {
    Logger.debug({
      message: "end request",
      method: method,
      url: originalUrl,
      responseHeaders: response.getHeaders(),
      durationInMs,
    });
    return;
  }

  Logger.info({ message: "end request", method, url: originalUrl, durationInMs });
};

/**
 * Logs a start and end entry for every request and
 * determines the duration of the executed code.
 *
 * @param appConfig App configuration
 */
const requestLogging =
  (appConfig: AppConfig) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const { logLevel } = appConfig;

    const startDate = new Date();
    startRequestLog(request, logLevel);

    next();

    const requestDurationInMs = Date.now() - startDate.getTime();
    endRequestLog(request, response, logLevel, requestDurationInMs);
  };

export default requestLogging;
