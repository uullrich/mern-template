import { MongoClient, Collection } from "mongodb";

export class MongoTestHelper {
  constructor(private mongoClient: MongoClient) {}

  public async connect(): Promise<void> {
    await mongoClient.connect();
  }

  public async disconnect(): Promise<void> {
    await mongoClient.close();
  }

  public async clear(): Promise<void> {
    const collections = await mongoClient.db().collections();
    if (collections.length === 0) {
      console.log("No collections found.");
      return;
    }

    for (const collection of collections) {
      const deleteResult = await collection.deleteMany({});
      console.log(`Deleted ${deleteResult.deletedCount} document(s) from collection ${collection.collectionName}`);
    }
  }

  public getCollectionByName(collectionName: string): Collection {
    return mongoClient.db().collection(collectionName);
  }
}

const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION as string);
export default new MongoTestHelper(mongoClient);
