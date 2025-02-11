// profile.js
console.log("🔥 profile.js is running!");

import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js"; // Import the profile access check

import "./updateAvatar.js";

updateWelcomeMessage();
fetchProfile();
checkProfileAccess(); // Check profile access
