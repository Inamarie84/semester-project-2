// utils/logout.js

export function handleLogout() {
  const logoutBtn = document.querySelector("#logout-btn");

  // Check if the user is logged in by looking for a token in localStorage
  const token = localStorage.getItem("token");

  if (token) {
    // Show the logout button if the user is logged in
    logoutBtn.classList.remove("hidden");
    logoutBtn.classList.add("block");
  } else {
    // Hide the logout button if the user is not logged in
    logoutBtn.classList.remove("block");
    logoutBtn.classList.add("hidden");
  }

  // Logout functionality
  logoutBtn.addEventListener("click", () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    window.location.href = "/auth/login.html";
  });
}
