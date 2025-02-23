// Function to update the welcome message
export function updateWelcomeMessage() {
  console.log("✅ Running updateWelcomeMessage..."); // Debugging

  const username = localStorage.getItem("username");
  console.log("Stored Username in Local Storage:", username); // Debugging

  const welcomeMessage = document.getElementById("welcomeMessage");

  // Ensure the welcome message element exists
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
}
