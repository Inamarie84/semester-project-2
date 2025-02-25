export function updateWelcomeMessage() {
  console.log("✅ Running updateWelcomeMessage...");

  const username = localStorage.getItem("username");

  const welcomeMessage = document.getElementById("welcomeMessage");

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
