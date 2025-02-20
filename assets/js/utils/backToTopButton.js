// backToTopButton.js
export function setupBackToTopButton() {
  const backToTopButton = document.getElementById("back-to-top");

  // Show or hide the back-to-top button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove("opacity-0");
      backToTopButton.classList.add("opacity-100");
    } else {
      backToTopButton.classList.remove("opacity-100");
      backToTopButton.classList.add("opacity-0");
    }
  });

  // Scroll back to top when the button is clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
