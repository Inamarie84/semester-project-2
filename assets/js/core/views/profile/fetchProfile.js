import { getFromLocalStorage } from "../../../utils/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";

const welcomeMessage = document.querySelector("#welcomeMessage");
const avatarImage = document.querySelector("#avatar-image");
const bannerImage = document.querySelector("#banner-image");
const profileName = document.querySelector("#profile-name");
const profileEmail = document.querySelector("#profile-email");
const profileBio = document.querySelector("#profile-bio");
const credits = document.querySelector("#credits");
const listingsCount = document.querySelector("#listings-count");
const winsCount = document.querySelector("#wins-count");

export async function fetchProfile() {
  const username = getFromLocalStorage("username");
  if (!username) {
    console.error("No username found in local storage.");
    return;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      headers: headers(), // Use the headers function
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const { data } = await response.json();

    // Update welcome message
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome, ${data.name}!`;
    }

    // Update banner image
    if (data.banner?.url && bannerImage) {
      bannerImage.src = data.banner.url;
      bannerImage.alt = data.banner.alt || "Profile banner";
    }

    // Update avatar image
    if (data.avatar?.url && avatarImage) {
      avatarImage.src = data.avatar.url;
      avatarImage.alt = data.avatar.alt || "User avatar";
    }

    // Update profile details
    if (profileName) profileName.textContent = data.name;
    if (profileEmail) profileEmail.textContent = data.email;
    if (profileBio) profileBio.textContent = data.bio || "No bio available.";
    if (credits) credits.textContent = data.credits;
    if (listingsCount) listingsCount.textContent = data._count.listings;
    if (winsCount) winsCount.textContent = data._count.wins;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
