const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export function getApiBase() {
  return API_BASE;
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, token, signal } = options;

  const headers = {};
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    throw new Error("Unable to reach the server. Please try again.");
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(
      payload?.message || "Something went wrong. Please try again.",
    );
  }

  return payload;
}

export function getAdminToken() {
  return sessionStorage.getItem("vjeeraAdminToken") || "";
}

export function setAdminSession(token, admin) {
  sessionStorage.setItem("vjeeraAdminToken", token);
  sessionStorage.setItem("vjeeraAdmin", JSON.stringify(admin || {}));
}

export function clearAdminSession() {
  sessionStorage.removeItem("vjeeraAdminToken");
  sessionStorage.removeItem("vjeeraAdmin");
}

export function getAdminProfile() {
  try {
    return JSON.parse(sessionStorage.getItem("vjeeraAdmin") || "null");
  } catch {
    return null;
  }
}

export function adminRequest(path, options = {}) {
  return apiRequest(path, {
    ...options,
    token: getAdminToken(),
  });
}
