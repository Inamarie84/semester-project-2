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
  console.log("Document still loading, waiting for it to be ready...");
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      console.log("Document is ready, initializing app...");
      requestAnimationFrame(initializeApp);
    }
  });
} else {
  console.log("Document already loaded, initializing app immediately...");
  requestAnimationFrame(initializeApp);
}
