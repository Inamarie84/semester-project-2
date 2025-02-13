// profile.js
console.log("🔥 profile.js is running!");

import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";

// Import, but do NOT call updateAvatar() here
import { updateAvatar } from "./updateAvatar.js";

updateWelcomeMessage();
fetchProfile();
checkProfileAccess();
initializeBioUpdate();
