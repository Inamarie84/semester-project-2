import router from "./core/router.js";

import { toggleMobileMenu } from "./components/navigation/menuToggle.js";

import { setActiveNav } from "./components/navigation/activeNav.js";

import { handleLogout } from "./utils/auth/logout.js";

import { setupBackToTopButton } from "./components/dom/backToTopButton.js";

async function initializeApp() {
  toggleMobileMenu();

  await router(window.location.pathname);

  handleLogout();

  setActiveNav();

  setupBackToTopButton();
}

if (document.readyState === "loading") {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      requestAnimationFrame(initializeApp);
    }
  });
} else {
  requestAnimationFrame(initializeApp);
}
