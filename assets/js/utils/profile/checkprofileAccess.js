export function checkProfileAccess() {
  const accessToken = localStorage.getItem("accessToken");
  const profileContainer = document.querySelector("#profile-container");
  const accessMessageContainer = document.querySelector(
    "#profileaccess-container",
  );

  if (!accessMessageContainer || !profileContainer) {
    return;
  }

  if (!accessToken) {
    accessMessageContainer.classList.remove("hidden");
    profileContainer.classList.add("hidden");
  } else {
    accessMessageContainer.classList.add("hidden");
    profileContainer.classList.remove("hidden");
  }
}
