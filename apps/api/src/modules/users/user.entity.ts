import type { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  authProvider: "local";
  createdAt: Date;
  updatedAt: Date;
}
