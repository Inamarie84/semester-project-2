export function toggleSection(buttonId, sectionId, showText, hideText) {
  const section = document.getElementById(sectionId);
  const button = document.getElementById(buttonId);

  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    button.textContent = hideText;
  } else {
    section.style.display = "none";
    button.textContent = showText;
  }
}
