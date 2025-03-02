import { fetchUserBids } from "../../api/profile/fetchUserBids.js";
import { fetchUserWins } from "../../api/profile/fetchUserWins.js";

export async function displayUserBids() {
  const bidsContainer = document.getElementById("bid-listings");
  const userBids = await fetchUserBids();

  if (!bidsContainer) return;

  if (!userBids || userBids.length === 0) {
    const noBidsDiv = document.createElement("div");
    noBidsDiv.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "w-full",
      "col-span-full",
    );

    const noBidsText = document.createElement("p");
    noBidsText.classList.add("text-center", "text-gray-500");
    noBidsText.textContent = "No bids placed yet.";

    noBidsDiv.appendChild(noBidsText);
    bidsContainer.appendChild(noBidsDiv);
    return;
  }

  userBids.forEach((listing) => {
    const listingDiv = document.createElement("div");
    listingDiv.classList.add("p-4", "border", "rounded", "shadow-md");

    const title = document.createElement("h3");
    title.textContent = listing.listing.title;

    const bidAmount = document.createElement("p");
    bidAmount.textContent = `Bid Amount: ${listing.amount} $`;

    listingDiv.appendChild(title);
    listingDiv.appendChild(bidAmount);
    bidsContainer.appendChild(listingDiv);
  });
}

export async function displayUserWins() {
  const winsContainer = document.getElementById("win-listings");
  const userWins = await fetchUserWins();

  if (!winsContainer) return;

  if (!userWins || userWins.length === 0) {
    const noWinsDiv = document.createElement("div");
    noWinsDiv.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "w-full",
      "col-span-full",
    );

    const noWinsText = document.createElement("p");
    noWinsText.classList.add("text-center", "text-gray-500");
    noWinsText.textContent = "No wins yet.";

    noWinsDiv.appendChild(noWinsText);
    winsContainer.appendChild(noWinsDiv);
    return;
  }

  userWins.forEach((listing) => {
    const listingDiv = document.createElement("div");
    listingDiv.classList.add(
      "p-4",
      "border",
      "rounded",
      "shadow-md",
      "bg-green-100",
    );

    const title = document.createElement("h3");
    title.textContent = listing.title;

    const winMessage = document.createElement("p");
    winMessage.textContent = `You won this auction for ${listing._count.bids} bids!`;

    listingDiv.appendChild(title);
    listingDiv.appendChild(winMessage);
    winsContainer.appendChild(listingDiv);
  });
}
