import mongoose from "mongoose";
import appConfig from "../config/AppConfig";
import Logger from "../util/Logger";
import { ConnectionError } from "../error/ConnectionError";
import { ConnectionType } from "./ConnectionType";
import { ErrorCode } from "../error/ErrorCode";

export class DatabaseConnector {
  private static NUMBER_OF_CONNECTION_RETRIES = 3;

  public static async connect(): Promise<void> {
    mongoose.set("strictQuery", true);

    mongoose.connection.on("connected", () => Logger.info("MongoDB is connected"));
    mongoose.connection.on("open", () => Logger.info("MongoDB connection is open"));
    mongoose.connection.on("disconnected", () => Logger.info("MongoDB connection is disconnected"));
    mongoose.connection.on("reconnected", () => Logger.info("MongoDB connection has reconnected"));
    mongoose.connection.on("disconnecting", () => Logger.info("MongoDB disconnecting"));
    mongoose.connection.on("close", () => Logger.info("MongoDB connection closed"));
    mongoose.connection.on("error", (error) => {
      Logger.error(error);
    });

    for (let index = 1; index <= DatabaseConnector.NUMBER_OF_CONNECTION_RETRIES; index++) {
      try {
        await mongoose.connect(appConfig.mongoDbConnection, { serverSelectionTimeoutMS: 2000 });
      } catch (error) {
        Logger.error({ message: `Connection to MongoDB failed for retry number ${index}`, error });

        if (index >= DatabaseConnector.NUMBER_OF_CONNECTION_RETRIES) {
          throw ConnectionError.build(
            ConnectionType.DATABASE,
            ErrorCode.DATABASE_ERROR,
            "Max attempts for connection retries reached",
            { maxNumberOfRetries: DatabaseConnector.NUMBER_OF_CONNECTION_RETRIES },
            [error],
          );
        }
      }
    }
  }
}
