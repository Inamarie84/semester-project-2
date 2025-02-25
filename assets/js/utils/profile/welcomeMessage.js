export function updateWelcomeMessage() {
  const username = localStorage.getItem("username");

  const welcomeMessage = document.getElementById("welcomeMessage");

  if (!welcomeMessage) {
    return;
  }

  if (username) {
    welcomeMessage.textContent = `Welcome, ${username}!`;
  } else {
    welcomeMessage.textContent = "Welcome!";
  }
}
