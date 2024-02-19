import appConfig from "../config/AppConfig.js";
import { createLogger, format, transports } from "winston";
import asyncLocalStorage from "../util/AsyncLocalStorage.js";

const logger = createLogger({
  level: appConfig.logLevel,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss:ms",
    }),
    format.errors({ stack: true }),
    format((info) => {
      const { timestamp, level, message, ...rest } = info as typeof info & {
        timestamp: string;
        message: string;
      };

      const requestStore = asyncLocalStorage.getStore();

      //Change the order of the attributes
      return {
        level,
        timestamp,
        requestId: requestStore?.requestId,
        message,
        ...rest,
      };
    })(),
    format.json({ deterministic: false }),
    format.colorize({ all: true }),
  ),
  transports: [new transports.Console()],
});

export default logger;
