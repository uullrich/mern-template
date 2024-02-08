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
  port: number;
  mongoDbConnection: string;
  logLevel: LogLevel;
}
