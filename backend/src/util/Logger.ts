import appConfig from "../config/AppConfig";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: appConfig.logLevel,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss:ms",
    }),
    format.errors({ stack: true }),
    format((info) => {
      const { requestId, timestamp, level, message, ...rest } = info as typeof info & {
        timestamp: string;
        message: string;
        requestId: string;
      };

      //Change the order of the attributes
      return {
        level,
        timestamp,
        requestId,
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
