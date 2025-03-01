export function setActiveNav() {
  const currentPath = window.location.pathname;

  const navLinks = document.querySelectorAll(
    "nav a, #menu a, #mobile.menu li a",
  );

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("text-theme", "font-semibold"); // Active link styling
    } else {
      link.classList.remove("text-theme", "font-semibold", "underline"); // Remove from inactive links
    }
  });
}
