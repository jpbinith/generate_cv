import express from "express";
import cors from "cors";
import { connectToDatabase, pingDatabase } from "./lib/database.js";
import { env } from "./config/env.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "10mb" }));

app.get("/health", async (_req, res) => {
  const databaseOk = await pingDatabase().catch(() => false);

  res.json({
    database: databaseOk ? "connected" : "disconnected",
    status: databaseOk ? "ok" : "degraded",
  });
});

async function startServer() {
  await connectToDatabase();

  app.listen(env.apiPort, () => {
    console.log(`API running on http://localhost:${env.apiPort}`);
    console.log(
      `MongoDB connected on ${env.mongodbHost}:${env.mongodbPort}/${env.mongodbDatabase}`,
    );
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start API server", error);
  process.exit(1);
});
