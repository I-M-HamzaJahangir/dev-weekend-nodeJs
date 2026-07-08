import { ApiError } from "../types";

export const API_BASE = "http://localhost:8000/api";

interface RequestOptions {
  method?: string;
  body?: unknown;
  isForm?: boolean;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, isForm = false } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: isForm ? undefined : { "Content-Type": "application/json" },
    body: body ? (isForm ? (body as FormData) : JSON.stringify(body)) : undefined,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await res.json() : null;

  if (!res.ok) {
    const message = payload?.msg ?? payload?.errors?.[0]?.message ?? "Something went wrong";
    throw new ApiError(message, res.status, payload?.errors ?? []);
  }

  return payload as T;
}
