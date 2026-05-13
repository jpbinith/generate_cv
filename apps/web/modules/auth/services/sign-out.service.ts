import { HttpClientError, post } from "@/lib/http-client";

export type SignOutResponse = {
  message: string;
};

export class SignOutRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function signOut(): Promise<SignOutResponse> {
  try {
    return await post<SignOutResponse>("/api/auth/sign-out", {
      credentials: "include",
    });
  } catch (error: unknown) {
    if (error instanceof HttpClientError) {
      throw new SignOutRequestError(error.message);
    }

    throw error;
  }
}
