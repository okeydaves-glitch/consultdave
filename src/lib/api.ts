// ============================================================================
// API Client
// ============================================================================
// A thin wrapper around the browser's native fetch() API for calling
// our own API routes (app/api/*).
//
// Why not use axios or the Supabase client directly for everything?
// - Our API routes contain business logic (booking calculations, payment
//   verification) that needs server-side processing
// - The Supabase client is used for direct database queries when we don't
//   need business logic (e.g., fetching a car listing)
// - This client handles auth headers, error handling, and JSON parsing
//
// Usage:
//   import { api } from "@/lib/api";
//   const cars = await api.get("/cars?location=lagos");
//   const booking = await api.post("/bookings", { carId, dates });
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Custom error class for API errors
// Makes it easy to distinguish API errors from other errors
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}/api${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // Handle non-JSON responses (e.g., PDF downloads)
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/pdf")) {
    return response.blob() as unknown as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.error || data.message || "An error occurred",
      response.status
    );
  }

  return data;
}

// Convenience methods for common HTTP verbs
export const api = {
  get: <T>(endpoint: string, params?: Record<string, any>) => {
    // Build query string from params object
    const queryString = params
      ? "?" + new URLSearchParams(
          Object.entries(params).filter(([_, v]) => v !== undefined && v !== null).map(([k, v]) => [k, String(v)])
        ).toString()
      : "";
    return request<T>(`${endpoint}${queryString}`, { method: "GET" });
  },

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};
