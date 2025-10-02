// assets/js/api/auth/fetchAuth.js
import { AUTH_LOGIN_URL, AUTH_REGISTER_URL } from "../constants.js";

/**
 * POST /auth/login
 * @param {{ email: string; password: string }} userDetails
 * @returns {Promise<any>}
 */
export async function loginUser(userDetails) {
  const payload = {
    email: String(userDetails?.email || "").trim().toLowerCase(),
    password: String(userDetails?.password || ""),
  };

  const res = await fetch(AUTH_LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Read the body once and then branch
  const raw = await res.text();
  let json = {};
  try {
    json = raw ? JSON.parse(raw) : {};
  } catch {
    // leave json as {}
  }

  if (!res.ok) {
    const msg =
      json?.errors?.[0]?.message ||
      json?.message ||
      (res.status === 401
        ? "Invalid email or password."
        : `Login failed. Status: ${res.status}`);
    throw new Error(msg);
  }

  return json.data || json;
}

/**
 * POST /auth/register
 * @param {{ name: string; email: string; password: string }} userDetails
 * @returns {Promise<any>}
 */
export async function registerUser(userDetails) {
  const payload = {
    name: String(userDetails?.name || "").trim(),
    email: String(userDetails?.email || "").trim().toLowerCase(),
    password: String(userDetails?.password || ""),
  };

  const res = await fetch(AUTH_REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const raw = await res.text();
  let json = {};
  try {
    json = raw ? JSON.parse(raw) : {};
  } catch {
    // leave json as {}
  }

  if (!res.ok) {
    const domainHint =
      /noroff/i.test(payload.email) || payload.email.endsWith("@stud.noroff.no")
        ? ""
        : " (Note: registration usually requires a @stud.noroff.no email)";
    const msg =
      json?.errors?.[0]?.message ||
      json?.message ||
      `Registration failed. Status: ${res.status}${domainHint}`;
    throw new Error(msg);
  }

  return json.data || json;
}
