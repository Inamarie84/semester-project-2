export function handleLogout() {
  const logoutBtn = document.querySelector("#logout-btn");
  const mobileLogoutBtn = document.querySelector("#mobile-logout-btn");

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    logoutBtn.classList.remove("hidden");
    logoutBtn.classList.add("block");

    mobileLogoutBtn.classList.remove("hidden");
    mobileLogoutBtn.classList.add("block");
  } else {
    logoutBtn.classList.remove("block");
    logoutBtn.classList.add("hidden");

    mobileLogoutBtn.classList.remove("block");
    mobileLogoutBtn.classList.add("hidden");
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    window.location.href = "/login.html";
  });

  // Event listener for mobile logout button
  mobileLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    window.location.href = "/login.html";
  });
}
