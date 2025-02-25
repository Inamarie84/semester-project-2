import { placeBid } from "../bids/placeAndFetchBids.js";
import { createButton } from "../../utils/dom/listingHelpers.js";
import { showMessage } from "../../utils/dom/messageHandler.js"; // Import showMessage

export function createBidForm(listing, token) {
  const bidForm = document.createElement("div");
  bidForm.className = "mt-4 p-4 border rounded bg-white";

  if (token) {
    const bidInput = document.createElement("input");
    bidInput.type = "number";
    bidInput.id = "bid-amount";
    bidInput.min = "1";
    bidInput.className = "w-full p-2 mb-3 border rounded";

    const placeBidBtn = createButton("Place Bid", "#", [
      "w-fit",
      "mx-auto",
      "font-heading",
      "text-base",
      "bg-header",
      "text-light-bg",
      "py-2",
      "px-4",
      "rounded-md",
      "hover:bg-footer",
      "transition",
      "duration-300",
      "shadow-md",
      "focus:shadow-lg",
      "text-center",
      "block",
      "mt-2",
    ]);

    placeBidBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const bidAmount = parseFloat(bidInput.value);
      if (isNaN(bidAmount) || bidAmount <= 0) {
        showMessage(
          "error",
          "Please enter a valid bid amount.",
          "messages-container",
        );
        return;
      }

      placeBid(listing.id, bidAmount)
        .then(() => {
          alert("Your bid has been placed successfully.");
          location.reload();
        })
        .catch((error) => {
          console.error("❌ Error placing bid:", error);
          alert("Failed to place your bid. Please try again.");
        });
    });

    bidForm.append(bidInput, placeBidBtn);
  } else {
    bidForm.innerHTML = "<p class='text-red-500'>Log in to place a bid.</p>";
  }

  return bidForm;
}
