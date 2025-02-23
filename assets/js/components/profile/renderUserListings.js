import { LISTINGS_URL } from "../../api/constants.js";

export function renderUserListings(listings) {
  const profileListingsContainer = document.getElementById("profile-listings");

  if (!Array.isArray(listings) || listings.length === 0) {
    profileListingsContainer.innerHTML = `
        <div class="flex justify-center items-center w-full col-span-full">
          <p class="text-center text-gray-500">No listings created yet.</p>
        </div>
      `;
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
    image.classList.add("w-full", "h-48", "object-cover", "rounded-md", "mb-3");

    if (listing.media && listing.media.length > 0) {
      image.src = listing.media[0].url;
      image.alt = listing.media[0].alt || "Listing Image";
    } else {
      image.src = "https://via.placeholder.com/300x200?text=No+Image+Available";
      image.alt = "No Image Available";
    }

    // Title
    const title = document.createElement("h3");
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
    bidsCount.classList.add("text-sm", "font-medium", "mt-2", "text-gray-700");

    // View Listing Button
    const viewButton = document.createElement("a");
    viewButton.href = `/listing/single-listing.html?id=${listing.id}`; // Link to the single listing page
    viewButton.textContent = "View Listing";
    viewButton.classList.add(
      "mt-3",
      "px-4",
      "py-2",
      "bg-header",
      "text-light-bg",
      "rounded-lg",
      "hover:bg-footer",
      "transition",
      "duration-300",
      "shadow-md",
      "focus:shadow-lg",
    );

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Listing";
    deleteButton.classList.add(
      "mt-3",
      "px-4",
      "py-2",
      "bg-delete-btn",
      "text-black",
      "rounded-lg",
      "hover:bg-delete-btn-hover",
      "transition",
      "duration-300",
      "shadow-md",
      "focus:shadow-lg",
    );

    deleteButton.addEventListener("click", async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this listing?",
      );
      if (confirmDelete) {
        try {
          const deleteResponse = await fetch(`${LISTINGS_URL}/${listing.id}`, {
            method: "DELETE",
            headers: headers(),
          });

          if (deleteResponse.ok) {
            alert("Listing deleted successfully");
            // Refresh the user listings after deletion
            const updatedListings = await fetchUserListings();
            renderUserListings(updatedListings);
          } else {
            console.error("❌ Error deleting listing");
          }
        } catch (error) {
          console.error("❌ Error deleting listing:", error.message);
        }
      }
    });

    // Append elements to card
    card.append(
      image,
      title,
      description,
      endsAt,
      bidsCount,
      viewButton,
      deleteButton,
    );

    // Append card to container
    profileListingsContainer.appendChild(card);
  });
}
