import { fetchListings } from "./fetchListings.js";
import { generatelistings } from "./generateListings.js";

const displayContainer = document.getElementById("listings-container");

async function main() {
  const listings = await fetchListings();
  generatelistings(listings, displayContainer);
}

main();
