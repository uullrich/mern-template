import express, { type Express } from "express";
import { Server } from "http";
import { galleryRouter, notFoundRouter } from "./routes/Routes";

class App {
  private express: Express;
  private server: Server;

  constructor(private port = 3000) {
    this.express = express();

    this.express.use(express.json());
    this.registerRoutes();
  }

  public start(): void {
    this.server = this.express.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  private registerRoutes(): void {
    this.express.use("/api/gallery", galleryRouter);
    this.express.use("*", notFoundRouter);
  }
}

const app = new App();
app.start();
