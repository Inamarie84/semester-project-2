console.log("🔥 profile.js is running!");

import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import "./updateAvatar.js";

updateWelcomeMessage();
fetchProfile();
