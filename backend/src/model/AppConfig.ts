export enum LogLevel {
  INFO = "info",
  DEBUG = "debug",
  WARNING = "warning",
  ERROR = "error",
}

export interface AppConfig {
  env: string;
  port: string;
  mongoDbConnection: string;
  logLevel: LogLevel;
}
