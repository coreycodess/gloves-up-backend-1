jest.setTimeout(30000);

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

//Connect to the in-memory database.
export const connect = async () => {
  await mongoServer.start();
  const uri = mongoServer.getUri();

  mongoose.set("strictQuery", false);

  await mongoose.connect(uri);
};

//Drop database, close the connection and stop mongod.
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

//Remove all the data for all db collections.
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
