// utils/checkProfileAccess.js

export function checkProfileAccess() {
  const accessToken = localStorage.getItem("accessToken");
  const profileContainer = document.querySelector("#profile-content");
  const accessMessageContainer = document.querySelector(
    "#profileaccess-container",
  );

  if (!accessToken) {
    // If the user is not logged in, show the access message
    accessMessageContainer.classList.remove("hidden");
    profileContainer.classList.add("hidden");
  } else {
    // If the user is logged in, show the profile content
    accessMessageContainer.classList.add("hidden");
    profileContainer.classList.remove("hidden");
  }
}
