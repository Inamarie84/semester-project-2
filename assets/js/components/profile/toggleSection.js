// Function to toggle visibility of a section and change button text
export function toggleSection(buttonId, sectionId, showText, hideText) {
  const section = document.getElementById(sectionId);
  const button = document.getElementById(buttonId);

  // Toggle section visibility
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    button.textContent = hideText; // Change button text to "Hide"
  } else {
    section.style.display = "none";
    button.textContent = showText; // Change button text to "Show"
  }
}
