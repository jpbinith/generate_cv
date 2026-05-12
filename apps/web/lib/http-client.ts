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

const DEFAULT_API_BASE_URL = "http://localhost:4000";

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

async function request<TResponse>(
  path: string,
  options: RequestOptions,
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

async function safeParseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
