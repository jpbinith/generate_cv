export type HttpClientIssue = {
  field: string;
  message: string;
};

export type HttpClientErrorResponse = {
  error: string;
  issues?: HttpClientIssue[];
};

type RequestOptions = {
  body?: unknown;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

const DEFAULT_API_BASE_URL = "";

export class HttpClientError extends Error {
  readonly statusCode: number;
  readonly issues: HttpClientIssue[];

  constructor(
    message: string,
    statusCode: number,
    issues: HttpClientIssue[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.issues = issues;
  }
}

export async function post<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  return request<TResponse>(path, {
    ...options,
    method: "POST",
  });
}

export async function get<TResponse>(
  path: string,
  options: Omit<RequestOptions, "body" | "method"> = {},
): Promise<TResponse> {
  return request<TResponse>(path, {
    ...options,
    method: "GET",
  });
}

export async function put<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  return request<TResponse>(path, {
    ...options,
    method: "PUT",
  });
}

async function request<TResponse>(
  path: string,
  options: RequestOptions,
  hasRetriedAfterRefresh = false,
): Promise<TResponse> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: options.credentials,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (
    response.status === 401 &&
    !hasRetriedAfterRefresh &&
    shouldAttemptSessionRefresh(path)
  ) {
    const didRefreshSucceed = await refreshSession();

    if (didRefreshSucceed) {
      return request<TResponse>(path, options, true);
    }
  }

  if (response.ok) {
    return (await response.json()) as TResponse;
  }

  const errorResponse = (await safeParseJson(
    response,
  )) as HttpClientErrorResponse | null;

  throw new HttpClientError(
    errorResponse?.error ?? "Unexpected request failure.",
    response.status,
    errorResponse?.issues ?? [],
  );
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

let refreshSessionPromise: Promise<boolean> | null = null;

function shouldAttemptSessionRefresh(path: string): boolean {
  return (
    path !== "/api/auth/sign-in" &&
    path !== "/api/auth/sign-up" &&
    path !== "/api/auth/refresh"
  );
}

async function refreshSession(): Promise<boolean> {
  if (!refreshSessionPromise) {
    refreshSessionPromise = fetch(`${getApiBaseUrl()}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.ok)
      .catch(() => false)
      .finally(() => {
        refreshSessionPromise = null;
      });
  }

  return refreshSessionPromise;
}

async function safeParseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
