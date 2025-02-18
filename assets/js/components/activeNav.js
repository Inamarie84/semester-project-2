export function setActiveNav() {
  const currentPath = window.location.pathname;

  // Select all links inside both the main nav and mobile nav
  const navLinks = document.querySelectorAll("nav a, #menu a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("text-theme", "font-semibold", "underline"); // Active link styling
    } else {
      link.classList.remove("text-theme", "font-semibold", "underline"); // Remove from inactive links
    }
  });
}
