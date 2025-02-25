// import { getFromLocalStorage } from "../storage.js";

// export function checkProfileAccess() {
//   const accessToken = localStorage.getItem("accessToken");
//   const profileContainer = document.querySelector("#profile-container");
//   const accessMessageContainer = document.querySelector(
//     "#profileaccess-container",
//   );

//   if (!accessMessageContainer || !profileContainer) {
//     return;
//   }

//   if (!accessToken) {
//     accessMessageContainer.classList.remove("hidden");
//     profileContainer.classList.add("hidden");
//   } else {
//     accessMessageContainer.classList.add("hidden");
//     profileContainer.classList.remove("hidden");
//   }
// }

import { getFromLocalStorage } from "../../utils/storage/storage.js"; // Make sure the path is correct

export function checkProfileAccess() {
  const profileContainer = document.getElementById("profile-container");
  const accessMessageContainer = document.getElementById(
    "profileaccess-container",
  );
  const accessToken = getFromLocalStorage("accessToken");

  console.log("Current pathname:", window.location.pathname);
  console.log("Access Token:", accessToken);

  if (!accessToken) {
    console.log(
      "User not logged in. Hiding profile container and showing access message.",
    );

    profileContainer.classList.add("hidden");
    profileContainer.style.display = "none";

    accessMessageContainer.classList.remove("hidden");
    accessMessageContainer.style.display = "block";
  } else {
    console.log(
      "User is logged in. Showing profile container and hiding access message.",
    );

    profileContainer.classList.remove("hidden");
    profileContainer.style.display = "block";

    accessMessageContainer.classList.add("hidden");
    accessMessageContainer.style.display = "none";
  }

  console.log("Profile Container classes (after):", profileContainer.classList);
  console.log(
    "Access Message Container classes (after):",
    accessMessageContainer.classList,
  );
}
