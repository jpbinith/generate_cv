import express from "express";
import cors from "cors";
import { connectToDatabase, pingDatabase } from "./lib/database.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { ensureRefreshTokenIndexes } from "./modules/auth/refresh-token.repository.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { ensureUserIndexes } from "./modules/users/user.repository.js";

const app = express();

app.use(cors({ origin: env.webAppOrigin, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use("/auth", authRouter);

app.get("/health", async (_req, res) => {
  const databaseOk = await pingDatabase().catch(() => false);

  res.json({
    database: databaseOk ? "connected" : "disconnected",
    status: databaseOk ? "ok" : "degraded",
  });
});

app.use(errorHandler);

async function startServer() {
  await connectToDatabase();
  await ensureUserIndexes();
  await ensureRefreshTokenIndexes();

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
