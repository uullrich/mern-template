export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  HTTP = "http",
  VERBOSE = "verbose",
  DEBUG = "debug",
  SILLY = "silly",
}

export interface AppConfig {
  env: string;
  port: string;
  mongoDbConnection: string;
  logLevel: LogLevel;
}
