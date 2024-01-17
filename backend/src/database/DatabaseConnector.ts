import mongoose from "mongoose";
import appConfig from "../config/AppConfig";

export class DatabaseConnector {
  public static async connect(): Promise<void> {
    mongoose.set("strictQuery", true);

    try {
      await mongoose.connect(appConfig.mongoDbConnection);
      console.log("Connection to MongoDB is established...");
    } catch (error) {
      console.error(error.message);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }
  }
}
