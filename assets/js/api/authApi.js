// Functions to handle API interactions for login and registration
import { AUTH_LOGIN_URL, AUTH_REGISTER_URL } from "./constants.js";

export async function loginUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(AUTH_LOGIN_URL, fetchOptions);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Login failed.");
    }
    return json.data;
  } catch (error) {
    throw new Error("Login error: " + error.message);
  }
}

export async function registerUser(userDetails) {
  try {
    const response = await fetch(AUTH_REGISTER_URL, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Registration failed.");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
