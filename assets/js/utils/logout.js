export function handleLogout() {
  const logoutBtn = document.querySelector("#logout-btn");
  const mobileLogoutBtn = document.querySelector("#mobile-logout-btn"); // Added mobile logout button

  const accessToken = localStorage.getItem("accessToken");

  // Show or hide both logout buttons depending on accessToken
  if (accessToken) {
    logoutBtn.classList.remove("hidden");
    logoutBtn.classList.add("block");

    mobileLogoutBtn.classList.remove("hidden"); // Show mobile logout button
    mobileLogoutBtn.classList.add("block");
  } else {
    logoutBtn.classList.remove("block");
    logoutBtn.classList.add("hidden");

    mobileLogoutBtn.classList.remove("block"); // Hide mobile logout button
    mobileLogoutBtn.classList.add("hidden");
  }

  // Event listener for desktop logout button
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/auth/login.html";
  });

  // Event listener for mobile logout button
  mobileLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/auth/login.html";
  });
}
