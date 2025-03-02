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
      const json = await response.json();
      throw new Error(
        json.message || `Login failed. Status: ${response.status}`,
      );
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error during login:", error);
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

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.errors?.[0]?.message ||
          `Registration failed. Status: ${response.status}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Registration error: " + error.message);
  }
}
