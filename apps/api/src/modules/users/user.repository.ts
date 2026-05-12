import type { Collection, OptionalId } from "mongodb";
import { getDatabase } from "../../lib/database.js";
import type { User } from "./user.entity.js";

const USERS_COLLECTION_NAME = "users";

export function getUsersCollection(): Collection<User> {
  return getDatabase().collection<User>(USERS_COLLECTION_NAME);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return getUsersCollection().findOne({ email: email.toLowerCase() });
}

export async function insertUser(
  user: Omit<User, "_id">,
): Promise<User> {
  const result = await getDatabase()
    .collection<OptionalId<User>>(USERS_COLLECTION_NAME)
    .insertOne(user);

  return {
    _id: result.insertedId,
    ...user,
  };
}

export async function ensureUserIndexes(): Promise<void> {
  await getUsersCollection().createIndex({ email: 1 }, { unique: true });
}
