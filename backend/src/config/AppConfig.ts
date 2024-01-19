import { AppConfig, LogLevel } from "../model/AppConfig";

const appConfig: AppConfig = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "3000",
  mongoDbConnection: process.env.MONGO_DB_CONNECTION || "",
  logLevel: (process.env.LOG_LEVEL as LogLevel) || "debug",
};

export default appConfig;
