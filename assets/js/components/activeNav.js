export function setActiveNav() {
  const currentPath = window.location.pathname;

  // Select all links inside both the main nav and mobile nav
  const navLinks = document.querySelectorAll(
    "nav a, #menu a, #mobile.menu li a",
  );

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("text-theme", "font-semibold", "underline"); // Active link styling
    } else {
      link.classList.remove("text-theme", "font-semibold", "underline"); // Remove from inactive links
    }
  });
}

// // Example of how the active class might be toggled in JavaScript
// const navLinks = document.querySelectorAll("#menu li a, #mobile-menu li a");

// navLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     // Remove active class from all links
//     navLinks.forEach((link) => link.classList.remove("active"));

//     // Add active class to the clicked link
//     link.classList.add("active");
//   });
// });
