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
      profileListingsContainer.innerHTML = `<p class="text-center text-gray-500">No listings created yet.</p>`;
      return;
    }

    profileListingsContainer.innerHTML = ""; // Clear previous listings

    listings.forEach((listing) => {
      const card = document.createElement("div");
      card.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-4",
        "flex",
        "flex-col",
        "items-center",
        "text-center",
        "transition",
        "hover:shadow-lg",
      );

      // Image or Placeholder
      const image = document.createElement("img");
      image.classList.add(
        "w-full",
        "h-48",
        "object-cover",
        "rounded-md",
        "mb-3",
      );

      if (listing.media && listing.media.length > 0) {
        image.src = listing.media[0].url;
        image.alt = listing.media[0].alt || "Listing Image";
      } else {
        image.src =
          "https://via.placeholder.com/300x200?text=No+Image+Available";
        image.alt = "No Image Available";
      }

      // Title
      const title = document.createElement("h2");
      title.textContent = listing.title;
      title.classList.add("text-lg", "font-bold", "mb-2");

      // Description
      const description = document.createElement("p");
      description.textContent =
        listing.description || "No description available.";
      description.classList.add("text-sm", "text-gray-600", "mb-3");

      // Ends At (Auction End Date)
      const endsAt = document.createElement("p");
      endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
      endsAt.classList.add("text-xs", "text-gray-500", "italic");

      // Bids Count
      const bidsCount = document.createElement("p");
      bidsCount.textContent = `Bids: ${listing._count?.bids ?? 0}`;
      bidsCount.classList.add(
        "text-sm",
        "font-medium",
        "mt-2",
        "text-gray-700",
      );

      // View Listing Button
      const viewButton = document.createElement("a");
      viewButton.href = `/listing/single-listing.html?id=${listing.id}`; // Link to the single listing page

      viewButton.textContent = "View Listing";
      viewButton.classList.add(
        "mt-3",
        "px-4",
        "py-2",
        "bg-blue-500",
        "text-white",
        "rounded-lg",
        "hover:bg-blue-600",
        "transition",
      );

      // Append elements to card
      card.append(image, title, description, endsAt, bidsCount, viewButton);

      // Append card to container
      profileListingsContainer.appendChild(card);
    });
  }
}
