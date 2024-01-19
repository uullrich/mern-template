import mongoose from "mongoose";
import appConfig from "../config/AppConfig";
import Logger from "../util/Logger";

export class DatabaseConnector {
  public static async connect(): Promise<void> {
    mongoose.set("strictQuery", true);

    try {
      await mongoose.connect(appConfig.mongoDbConnection);

      mongoose.connection.on("error", (error) => {
        Logger.error(error);
      });
      Logger.info("Connection to MongoDB is established...");
    } catch (error) {
      Logger.error({ message: "Connection to MongoDb failed", error });
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }
  }
}
