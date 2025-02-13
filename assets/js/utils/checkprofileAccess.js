export function checkProfileAccess() {
  const accessToken = localStorage.getItem("accessToken");
  const profileContainer = document.querySelector("#profile-container");
  const accessMessageContainer = document.querySelector(
    "#profileaccess-container",
  );

  if (!accessMessageContainer || !profileContainer) {
    console.error("🚨 Missing profile elements in the DOM");
    return; // Exit function to prevent errors
  }

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
