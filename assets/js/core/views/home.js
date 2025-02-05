import { API_KEY, LISTINGS_URL } from "../../api/constants.js";
import { getFromLocalStorage } from "../../utils/storage.js";

const displayContainer = document.getElementById("listings-container");

// add errorhandling
// add more content to the listings

async function fetchListings() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };
    const response = await fetch(LISTINGS_URL, fetchOptions);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

function generatelistings(listings) {
  for (let i = 0; i < listings.length; i++) {
    const listingsContainer = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = listings[i].title;

    const description = document.createElement("p");
    description.textContent = listings[i].description;

    listingsContainer.append(title, description);

    displayContainer.append(listingsContainer);
  }
}

async function main() {
  const listings = await fetchListings();
  generatelistings(listings);
}

main();
