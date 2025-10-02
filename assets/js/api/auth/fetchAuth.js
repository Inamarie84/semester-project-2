import { AUTH_LOGIN_URL, AUTH_REGISTER_URL } from "../constants.js";

export async function loginUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(AUTH_LOGIN_URL, fetchOptions);

    if (!response.ok) {
      const json = await response.json().catch(() => ({}));
      throw new Error(
        json.message || `Login failed. Status: ${response.status}`,
      );
    }

    const json = await response.json().catch(() => ({}));
    return json.data || json;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Login error: ${message}`);
  }
}

export async function registerUser(userDetails) {
  try {
    const response = await fetch(AUTH_REGISTER_URL, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(
        data.errors?.[0]?.message ||
          `Registration failed. Status: ${response.status}`,
      );
    }

    const data = await response.json().catch(() => ({}));
    return data.data || data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Registration error: ${message}`);
  }
}
