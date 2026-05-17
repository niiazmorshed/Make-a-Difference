// Centralized API base URL + tiny fetch helpers.
// In dev: use "/api" so requests go through Vite's proxy (same-origin, no CORS).
// In prod: hit the deployed server directly (firebase origin is allow-listed).
export const API_BASE = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE ||
    "https://make-a-difference-peach.vercel.app";

const buildUrl = (path) =>
  path.startsWith("http")
    ? path
    : `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

const logDev = (msg, err) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(`[api] ${msg}`, err);
  }
};

// GET — no credentials by default. Pass { withAuth: true } only for endpoints
// that need the JWT cookie. Default has no preflight, so it's resilient to
// Vercel cold-starts.
export const apiGet = async (path, { withAuth = false, signal } = {}) => {
  try {
    const res = await fetch(buildUrl(path), {
      credentials: withAuth ? "include" : "omit",
      signal,
    });
    if (!res.ok) {
      logDev(`GET ${path} -> ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    if (err?.name === "AbortError") return [];
    logDev(`GET ${path} failed`, err);
    return [];
  }
};

const sendJson = async (path, body, method, withAuth) => {
  const res = await fetch(buildUrl(path), {
    method,
    headers: { "content-type": "application/json" },
    credentials: withAuth ? "include" : "omit",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`Request failed: ${res.status} ${text}`);
    logDev(`${method} ${path} -> ${res.status}`, text);
    throw err;
  }
  return res.json();
};

export const apiSend = (path, body, method = "POST", opts = {}) =>
  sendJson(path, body, method, opts.withAuth ?? false);
export const apiPut = (path, body, opts = {}) =>
  sendJson(path, body, "PUT", opts.withAuth ?? false);
export const apiDelete = (path, opts = {}) =>
  sendJson(path, undefined, "DELETE", opts.withAuth ?? false);
