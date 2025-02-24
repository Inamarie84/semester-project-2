export function createBidsSection(bids) {
  const bidsSection = document.createElement("div");
  bidsSection.className = "mt-6";
  const bidsTitle = document.createElement("h2");
  bidsTitle.textContent = "Bids";
  bidsTitle.className = "text-lg font-semibold";
  const bidsContainer = document.createElement("div");
  bidsContainer.id = "bids-container";
  bidsContainer.className = "mt-2";

  if (!bids || bids.length === 0) {
    bidsContainer.innerHTML = "<p class='text-gray-500'>No bids yet.</p>";
  } else {
    bids.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort bids by latest
    bids.forEach((bid) => {
      const bidItem = document.createElement("div");
      bidItem.className = "flex justify-center items-center space-x-2 mt-2"; // Adjusted for spacing

      const bidderName = document.createElement("span");
      bidderName.className = "text-sm font-medium text-center"; // Centered text
      bidderName.textContent = bid.bidder.name;

      const bidAmount = document.createElement("span");
      bidAmount.className = "text-sm font-medium text-center"; // Centered text
      bidAmount.textContent = `$${bid.amount}`;

      bidItem.append(bidderName, bidAmount);
      bidsContainer.appendChild(bidItem);
    });
  }

  bidsSection.append(bidsTitle, bidsContainer);
  return bidsSection;
}
