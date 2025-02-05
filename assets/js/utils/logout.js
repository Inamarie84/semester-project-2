export function handleLogout() {
  const logoutBtn = document.querySelector("#logout-btn");

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    logoutBtn.classList.remove("hidden");
    logoutBtn.classList.add("block");
  } else {
    logoutBtn.classList.remove("block");
    logoutBtn.classList.add("hidden");
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");

    window.location.href = "/auth/login.html";
  });
}
