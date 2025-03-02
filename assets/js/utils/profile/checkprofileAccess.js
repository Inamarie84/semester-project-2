import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { showMessage } from "../dom/messageHandler.js";

export function checkProfileAccess() {
  const profileContainer = document.getElementById("profile-container");
  const accessMessageContainer = document.getElementById(
    "profileaccess-container",
  );
  const accessToken = getFromLocalStorage("accessToken");

  if (!accessToken) {
    showMessage(
      "error",
      "User not logged in. Please log in to view your profile.",
    );

    profileContainer.classList.add("hidden");
    profileContainer.style.display = "none";

    accessMessageContainer.classList.remove("hidden");
    accessMessageContainer.style.display = "block";
  } else {
    showMessage("success", "User is logged in. Welcome back!");

    profileContainer.classList.remove("hidden");
    profileContainer.style.display = "block";

    accessMessageContainer.classList.add("hidden");
    accessMessageContainer.style.display = "none";
  }
}
