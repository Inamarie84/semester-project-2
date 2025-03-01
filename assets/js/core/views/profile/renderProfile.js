export function renderProfile(data) {
  if (!data) return;

  const welcomeMessage = document.querySelector("#welcomeMessage");
  const avatarImage = document.querySelector("#avatar-image");
  const profileName = document.querySelector("#profile-name");
  const profileEmail = document.querySelector("#profile-email");
  const profileBio = document.querySelector("#profile-bio");
  const credits = document.querySelector("#credits");
  const listingsCount = document.querySelector("#listings-count");
  const winsCount = document.querySelector("#wins-count");

  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${data.name}!`;
  }

  if (data.avatar?.url && avatarImage) {
    avatarImage.src = data.avatar.url;
    avatarImage.alt = data.avatar.alt || "User avatar";
  }

  if (profileName) profileName.textContent = data.name;
  if (profileEmail) profileEmail.textContent = data.email;
  if (profileBio) profileBio.textContent = data.bio || "No bio available.";
  if (credits) credits.textContent = data.credits;
  if (listingsCount) listingsCount.textContent = data._count.listings;
  if (winsCount) winsCount.textContent = data._count.wins;
}
