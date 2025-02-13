// profile.js
console.log("🔥 profile.js is running!");

import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js";
import { updateAvatar } from "./updateAvatar.js";
import { initializeBioUpdate } from "./updateBio.js";

updateWelcomeMessage();
fetchProfile();
checkProfileAccess();

initializeBioUpdate();

updateAvatar();
