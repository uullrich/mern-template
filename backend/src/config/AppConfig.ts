import { AppConfig, LogLevel } from "../model/AppConfig";
import { readFileSync } from "node:fs";

function getMongoDatabaseConnection(): string {
  if (!process.env.MONGO_DB_CONNECTION_FILE) {
    return process.env.MONGO_DB_CONNECTION || "";
  }

  try {
    return readFileSync(process.env.MONGO_DB_CONNECTION_FILE || "", {
      encoding: "utf8",
      flag: "r",
    });
  } catch {
    return "";
  }
}

const appConfig: AppConfig = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "3000",
  mongoDbConnection: getMongoDatabaseConnection(),
  logLevel: (process.env.LOG_LEVEL as LogLevel) || "debug",
};

export default appConfig;
