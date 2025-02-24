export function showSkeletonLoader(container) {
  const skeletonLoader = `
      <div class="skeleton-card">
        <div class="skeleton-image h-40 bg-gray-300 rounded-md"></div>
        <div class="skeleton-text mt-2 h-6 bg-gray-300 rounded-md"></div>
        <div class="skeleton-text mt-1 h-4 bg-gray-300 rounded-md"></div>
      </div>
    `;
  container.innerHTML = skeletonLoader.repeat(6); // Repeat for multiple placeholders
}

export function hideSkeletonLoader(container, data) {
  container.innerHTML = ""; // Clear skeletons
  data.forEach((listing) => {
    container.innerHTML += `
        <div class="listing-card">
          <img src="${listing.imageUrl}" alt="${listing.title}" class="h-40 w-full rounded-md" />
          <h3 class="font-semibold">${listing.title}</h3>
          <p>${listing.description}</p>
        </div>
      `;
  });
}
