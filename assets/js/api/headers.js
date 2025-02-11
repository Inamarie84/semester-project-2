import { API_KEY } from "./constants.js";

/**
 * Sets up the necessary headers for making API requests, including authorization if a token is available.
 *
 * @returns {Headers} The headers for the API request.
 */
export function headers() {
  const accessToken = localStorage.getItem("accessToken");

  return new Headers({
    "Content-Type": "application/json",
    ...(API_KEY && { "X-Noroff-API-Key": API_KEY }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}
