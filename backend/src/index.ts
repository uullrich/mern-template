import express, { type Express } from "express";
import { Server } from "node:http";
import { galleryRouter, notFoundRouter } from "./routes/Routes";
import { ConfigValidator } from "./config/ConfigValidator";
import { AppConfig } from "./model/AppConfig";
import appConfig from "./config/AppConfig";
import { appConfigSchema } from "./validation/AppConfig.validation";
import { DatabaseConnector } from "./database/DatabaseConnector";

class App {
  private express: Express;
  private server: Server;
  private appConfig: AppConfig;

  constructor() {
    this.express = express();

    this.express.use(express.json());
    this.registerRoutes();
    this.validateAppConfig();
  }

  public async start(): Promise<void> {
    await DatabaseConnector.connect();

    this.server = this.express.listen(this.appConfig.port, () => {
      console.log(`Example app listening on port ${this.appConfig.port}`);
    });
  }

  private registerRoutes(): void {
    this.express.use("/api/gallery", galleryRouter);
    this.express.use("*", notFoundRouter);
  }

  private validateAppConfig(): void {
    const { validatedConfig, error } = ConfigValidator.validate<AppConfig>(appConfig, appConfigSchema);
    if (error || !validatedConfig) {
      console.log(`Invalid AppConfig stop the service:\n${error?.details.map((detail) => detail.message).join("\n")}`);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit();
    }

    this.appConfig = validatedConfig;
    console.log("AppConfig is valid!");
  }
}

const app = new App();
app
  .start()
  .then(() => {})
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(() => {});
