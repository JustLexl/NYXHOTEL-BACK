import { Db, MongoClient, ObjectId } from "mongodb";
import * as express from "express";

let client: MongoClient;
let connection: Db;

function getClient(): MongoClient {
  if (!client) {
    const url = process.env.MONGO_URI as string;
    if (!url) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return client;
}

export async function initializeMongo(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!connection) {
    try {
      const dbName = process.env.DB_NAME || "pmdapper";
      const mongoClient = getClient();
      await mongoClient.connect();
      connection = mongoClient.db(dbName);
      console.log("✅ MongoDB initialized");
    } catch (error) {
      console.error("❌ MongoDB initialization failed:", error);
      return next(error);
    }
  }
  next();
}

export async function connect() {
  if (!connection) {
    const dbName = process.env.DB_NAME || "pmdapper";
    const mongoClient = getClient();
    await mongoClient.connect();
    connection = mongoClient.db(dbName);
  }
  return connection;
}

export function getMongoId(documentId: string) {
  try {
    return new ObjectId(documentId);
  } catch (error) {
    return undefined;
  }
}

export { getClient as client };
