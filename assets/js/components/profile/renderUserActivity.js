import { fetchUserBids } from "../../api/profile/fetchUserBids.js";
import { fetchUserWins } from "../../api/profile/fetchUserWins.js";

export async function displayUserBids() {
  const bidsContainer = document.getElementById("bid-listings");
  const userBids = await fetchUserBids();

  console.log("User Bids API Response:", userBids); // ✅ Debugging

  if (!bidsContainer) return;

  if (!userBids || userBids.length === 0) {
    bidsContainer.innerHTML = `
      <div class="flex justify-center items-center w-full col-span-full">
        <p class="text-center text-gray-500">No bids placed yet.</p>
      </div>
    `;
    return;
  }

  bidsContainer.innerHTML = userBids
    .map(
      (listing) => `
      <div class="p-4 border rounded shadow-md">
        <h3 class="text-lg font-bold">${listing.listing.title}</h3> <!-- ✅ Use listing.listing.title -->
        <p>Bid Amount: ${listing.amount} credits</p>
      </div>
    `,
    )
    .join("");
}

export async function displayUserWins() {
  const winsContainer = document.getElementById("win-listings");
  const userWins = await fetchUserWins();

  console.log("User Wins API Response:", userWins); // ✅ Debugging

  if (!winsContainer) return;

  if (!userWins || userWins.length === 0) {
    winsContainer.innerHTML = `
    <div class="flex justify-center items-center w-full col-span-full">
      <p class="text-center text-gray-500">No wins yet.</p>
    </div>
  `;
    return;
  }

  winsContainer.innerHTML = userWins
    .map(
      (listing) => `
      <div class="p-4 border rounded shadow-md bg-green-100">
        <h3 class="text-lg font-bold">${listing.title}</h3>
        <p>You won this auction for ${listing._count.bids} bids!</p>
      </div>
    `,
    )
    .join("");
}
