import { AppConfig } from "../model/AppConfig";

const appConfig: Partial<AppConfig> = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || "3000",
  mongoDbConnection: process.env.MONGO_DB_CONNECTION,
};

export default appConfig;
