import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

function requireEnvValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function readNumberEnvValue(name: string): number {
  const value = requireEnvValue(name);
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`Environment variable ${name} must be a valid number.`);
  }

  return parsedValue;
}

export const env = {
  apiPort: readNumberEnvValue("API_PORT"),
  mongodbDatabase: requireEnvValue("MONGODB_DATABASE"),
  mongodbHost: requireEnvValue("MONGODB_HOST"),
  mongodbPassword: requireEnvValue("MONGODB_PASSWORD"),
  mongodbPort: readNumberEnvValue("MONGODB_PORT"),
  mongodbUri: process.env.MONGODB_URI,
  mongodbUsername: requireEnvValue("MONGODB_USERNAME"),
};

export function buildMongoConnectionUri(): string {
  if (env.mongodbUri) {
    return env.mongodbUri;
  }

  const username = encodeURIComponent(env.mongodbUsername);
  const password = encodeURIComponent(env.mongodbPassword);

  return `mongodb://${username}:${password}@${env.mongodbHost}:${env.mongodbPort}/${env.mongodbDatabase}?authSource=admin`;
}
