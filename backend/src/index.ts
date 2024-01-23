import express, { type Express } from "express";
import { Server } from "node:http";
import { galleryRouter, notFoundRouter } from "./routes/Routes";
import { ConfigValidator } from "./config/ConfigValidator";
import { AppConfig } from "./model/AppConfig";
import appConfig from "./config/AppConfig";
import { appConfigSchema } from "./validation/AppConfig.validation";
import DatabaseConnector from "./connectors/DatabaseConnector";
import errorHandler from "./middleware/errorHandler";
import Logger from "./util/Logger";
import { ConnectionError } from "./error/ConnectionError";
import requestLoggingMiddleware from "./middleware/requestLogging";
import asyncLocalStorageMiddleware from "./middleware/asyncLocalStorage";

class App {
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

    this.server = this.express.listen(this.appConfig.port, () => {
      Logger.info(`Example app listening on port ${this.appConfig.port}`);
    });
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
    this.express.use("/api/gallery", galleryRouter);
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

const app = new App();
app
  .start()
  .then(() => {})
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(() => {});
