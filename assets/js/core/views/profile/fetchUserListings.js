import { getFromLocalStorage } from "../../../utils/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";

export async function fetchUserListings() {
  const profileListingsContainer = document.getElementById("profile-listings");

  const username = getFromLocalStorage("username"); // Ensure you have the logged-in user's username
  const accessToken = getFromLocalStorage("accessToken");

  if (!accessToken || !username) {
    console.error("❌ User not logged in or missing username.");
    return;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}/listings`, {
      method: "GET",
      headers: headers(),
    });

    const data = await response.json();
    console.log(data); // Log to inspect the structure

    if (response.ok) {
      // Display the listings if available
      displayUserListings(data.data); // Listings are in 'data' based on the response
    } else {
      console.error("❌ Error fetching user listings", data);
    }
  } catch (error) {
    console.error("❌ Error fetching user listings:", error.message);
  }

  // Function to display listings on the profile page
  function displayUserListings(listings) {
    if (!Array.isArray(listings) || listings.length === 0) {
      profileListingsContainer.innerHTML = "<p>No listings created yet.</p>";
      return;
    }

    profileListingsContainer.innerHTML = ""; // Clear previous listings

    listings.forEach((listing) => {
      const listingElement = document.createElement("div");
      listingElement.classList.add("listing-item");
      listingElement.innerHTML = `
          <h3>${listing.title}</h3>
          <p>${listing.description}</p>
          <a href="/" class="btn-view">View Listing</a>
        `;
      profileListingsContainer.appendChild(listingElement);
    });
  }
}
