import { AppConfig, LogLevel } from "../../../src/model/AppConfig";

export const validAppConfigs: Partial<AppConfig>[] = [
  {
    env: "development",
    mongoDbConnection: "mongodb://mongodb:27017/demo-dev",
  },
  {
    env: "development",
    logLevel: LogLevel.DEBUG,
    mongoDbConnection: "mongodb://mongodb:27017/demo-dev",
    port: 3000,
  },
];

export const invalidAppConfigs: Partial<AppConfig>[] = [
  {},
  {
    env: "demo",
    mongoDbConnection: "mongodb://mongodb:27017/demo-dev",
  },
  {
    env: "production",
  },
  {
    mongoDbConnection: "mongodb://mongodb:27017/demo-dev",
  },
  {
    env: "development",
    mongoDbConnection: "",
  },
  {
    env: "development",
    logLevel: LogLevel.DEBUG,
    mongoDbConnection: "mongodb://mongodb:27017/demo-dev",
    port: 65_536,
  },
  {
    env: "development",
    logLevel: "unknown" as LogLevel,
    mongoDbConnection: "mongodb://mongodb:27017/demo-dev",
    port: 3000,
  },
];
