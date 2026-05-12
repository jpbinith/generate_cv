import { createHmac, randomBytes } from "node:crypto";
import { env } from "../../config/env.js";

type AccessTokenPayload = {
  sub: string;
  email: string;
  type: "access";
  exp: number;
};

export function createAccessToken(user: {
  id: string;
  email: string;
}): string {
  const payload: AccessTokenPayload = {
    sub: user.id,
    email: user.email,
    type: "access",
    exp: Math.floor(Date.now() / 1000) + env.accessTokenTtlMinutes * 60,
  };

  return signToken(payload, env.accessTokenSecret);
}

export function createRefreshToken(): string {
  return randomBytes(48).toString("base64url");
}

export function hashRefreshToken(token: string): string {
  return createHmac("sha256", env.refreshTokenSecret)
    .update(token)
    .digest("hex");
}

function signToken(payload: AccessTokenPayload, secret: string): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function toBase64Url(value: string): string {
  return Buffer.from(value).toString("base64url");
}
