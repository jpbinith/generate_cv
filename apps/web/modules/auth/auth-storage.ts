import { AUTH_USER_STORAGE_KEY } from "@/lib/auth";
import type { AuthUser } from "./types/auth.types";

export function readStoredAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = sessionStorage.getItem(AUTH_USER_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    sessionStorage.removeItem(AUTH_USER_STORAGE_KEY);
    return null;
  }
}

export function writeStoredAuthUser(user: AuthUser): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredAuthUser(): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(AUTH_USER_STORAGE_KEY);
}
