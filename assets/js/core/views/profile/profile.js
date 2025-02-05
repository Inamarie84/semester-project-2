import "./updateAvatar.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile script is running!"); // Debugging

  const username = localStorage.getItem("username");
  console.log("Stored Username in Local Storage:", username); // Debugging

  const welcomeMessage = document.getElementById("welcomeMessage");

  // Ensure the welcome message element exists before trying to modify it
  if (!welcomeMessage) {
    console.error("❌ Error: Could not find #welcomeMessage element.");
    return;
  }

  if (username) {
    welcomeMessage.textContent = `Welcome, ${username}!`;
    console.log(`✅ Welcome message set: Welcome, ${username}!`);
  } else {
    welcomeMessage.textContent = "Welcome!";
    console.warn("⚠️ No username found in localStorage. Default message set.");
  }
});
