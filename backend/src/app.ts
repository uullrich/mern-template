import express, { type Express } from "express";
import { Server } from "node:http";
import { galleryRouter, notFoundRouter, userRouter } from "./routes/Routes.js";
import { ConfigValidator } from "./config/ConfigValidator.js";
import { AppConfig } from "./model/AppConfig.js";
import appConfig from "./config/AppConfig.js";
import { appConfigSchema } from "./validation/AppConfig.validation.js";
import DatabaseConnector from "./connector/DatabaseConnector.js";
import errorHandler from "./middleware/errorHandler.js";
import Logger from "./util/Logger.js";
import { ConnectionError } from "./error/ConnectionError.js";
import requestLoggingMiddleware from "./middleware/requestLogging.js";
import asyncLocalStorageMiddleware from "./middleware/asyncLocalStorage.js";

export class App {
  private express: Express;
  private server: Server;
  private appConfig: AppConfig;

  constructor() {
    this.express = express();

    this.loadAppConfig();
    this.registerMiddleware();
    this.registerRoutes();
  }

  public async start(): Promise<void> {
    await this.connectToDatabase();

    await new Promise<void>((resolve) => {
      this.server = this.express.listen(this.appConfig.port, () => {
        resolve();
      });
    });

    Logger.info(`Example app listening on port ${this.appConfig.port}`);
  }

  public async stop(killProcess: boolean): Promise<void> {
    Logger.warn("Shutting down the application...");

    await new Promise<void>((resolve) => {
      this.server.close(() => {
        Logger.warn("Server is shutted down");
        resolve();
      });
    });

    await DatabaseConnector.disconnect();

    if (killProcess) {
      Logger.warn("Process gets killed");
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(0);
    }
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await DatabaseConnector.connect();
    } catch (error) {
      const databaseConnectionError = error as ConnectionError;
      Logger.error({ message: "Exit process due to database connection failure", error: databaseConnectionError });
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }
  }

  private registerMiddleware(): void {
    this.express.use(express.json());
    this.express.use(asyncLocalStorageMiddleware);
    this.express.use(requestLoggingMiddleware(this.appConfig));
  }

  private registerRoutes(): void {
    this.express.use("/api/user", userRouter);
    this.express.use("/api/user", galleryRouter);
    this.express.use("*", notFoundRouter);
    this.express.use(errorHandler);
  }

  private loadAppConfig(): void {
    const { validatedConfig, error } = ConfigValidator.validate<AppConfig>(appConfig, appConfigSchema);
    if (error || !validatedConfig) {
      console.log(`Invalid AppConfig stop the service:\n${error?.details.map((detail) => detail.message).join("\n")}`);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }

    this.appConfig = validatedConfig;
    Logger.info("AppConfig is valid!");
  }
}
