import type { Collection, ObjectId, OptionalId } from "mongodb";
import { getDatabase } from "../../lib/database.js";
import type { RefreshToken } from "./refresh-token.entity.js";

const REFRESH_TOKENS_COLLECTION_NAME = "refresh_tokens";

function getRefreshTokensCollection(): Collection<RefreshToken> {
  return getDatabase().collection<RefreshToken>(REFRESH_TOKENS_COLLECTION_NAME);
}

export async function insertRefreshToken(
  refreshToken: Omit<RefreshToken, "_id">,
): Promise<RefreshToken> {
  const result = await getDatabase()
    .collection<OptionalId<RefreshToken>>(REFRESH_TOKENS_COLLECTION_NAME)
    .insertOne(refreshToken);

  return {
    _id: result.insertedId,
    ...refreshToken,
  };
}

export async function findActiveRefreshTokenByHash(
  tokenHash: string,
): Promise<RefreshToken | null> {
  return getRefreshTokensCollection().findOne({
    tokenHash,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  });
}

export async function revokeRefreshTokenById(id: ObjectId): Promise<void> {
  await getRefreshTokensCollection().updateOne(
    { _id: id },
    {
      $set: {
        revokedAt: new Date(),
        updatedAt: new Date(),
      },
    },
  );
}

export async function revokeRefreshTokenByHash(tokenHash: string): Promise<void> {
  await getRefreshTokensCollection().updateMany(
    {
      tokenHash,
      revokedAt: null,
    },
    {
      $set: {
        revokedAt: new Date(),
        updatedAt: new Date(),
      },
    },
  );
}

export async function ensureRefreshTokenIndexes(): Promise<void> {
  await getRefreshTokensCollection().createIndex(
    { tokenHash: 1 },
    { unique: true },
  );
  await getRefreshTokensCollection().createIndex({ expiresAt: 1 });
}
