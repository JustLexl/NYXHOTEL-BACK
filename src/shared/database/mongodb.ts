import { Db, MongoClient, ObjectId } from "mongodb";
import * as express from "express";

let client: MongoClient | null = null;
let connection: Db | null = null;
let isConnecting = false;
let connectPromise: Promise<Db> | null = null;

function getClient(): MongoClient {
  if (!client) {
    const url = process.env.MONGO_URI as string;
    if (!url) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    client = new MongoClient(url);
  }
  return client;
}

async function ensureConnection(): Promise<Db> {
  // Already connected — return immediately
  if (connection) return connection;

  // If a connection is already in progress, wait for it
  if (connectPromise) return connectPromise;

  connectPromise = (async () => {
    const dbName = process.env.DB_NAME || "pmdapper";
    const mongoClient = getClient();
    await mongoClient.connect();
    connection = mongoClient.db(dbName);
    console.log("✅ MongoDB connected");
    return connection;
  })();

  try {
    return await connectPromise;
  } catch (error) {
    // Reset so next request can retry
    connectPromise = null;
    client = null;
    connection = null;
    throw error;
  }
}

export async function initializeMongo(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await ensureConnection();
    next();
  } catch (error) {
    console.error("❌ MongoDB initialization failed:", error);
    next(error);
  }
}

export async function connect(): Promise<Db> {
  return ensureConnection();
}

export function getMongoId(documentId: string) {
  try {
    return new ObjectId(documentId);
  } catch (error) {
    return undefined;
  }
}

export { getClient as client };
