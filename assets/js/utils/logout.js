export function handleLogout() {
  const logoutBtn = document.querySelector("#logout-btn");

  // Check if the user is logged in by looking for the accessToken in localStorage
  const accessToken = localStorage.getItem("accessToken"); // Use 'accessToken' instead of 'token'

  if (accessToken) {
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
    // Remove the accessToken from localStorage
    localStorage.removeItem("accessToken"); // Remove 'accessToken'

    // Redirect to the login page
    window.location.href = "/auth/login.html";
  });
}
