import { Db, MongoClient } from "mongodb";
import { buildMongoConnectionUri, env } from "../config/env.js";

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (database) {
    return database;
  }

  const connectionUri = buildMongoConnectionUri();
  const client = new MongoClient(connectionUri);

  await client.connect();

  mongoClient = client;
  database = client.db(env.mongodbDatabase);

  return database;
}

export function getDatabase(): Db {
  if (!database) {
    throw new Error("Database connection has not been initialized.");
  }

  return database;
}

export function isDatabaseConnected(): boolean {
  return database !== null;
}

export async function pingDatabase(): Promise<boolean> {
  if (!database) {
    return false;
  }

  await database.command({ ping: 1 });
  return true;
}

export async function closeDatabaseConnection(): Promise<void> {
  if (!mongoClient) {
    return;
  }

  await mongoClient.close();
  mongoClient = null;
  database = null;
}
