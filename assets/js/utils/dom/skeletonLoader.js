// export function showLoadingIndicator() {
//   document.getElementById("loading-indicator").classList.remove("hidden");
// }

// export function hideLoadingIndicator() {
//   document.getElementById("loading-indicator").classList.add("hidden");
// }

// skeletonLoader.js

export function handleSkeletonLoader(loaderId, contentWrapperId, delay = 1500) {
  setTimeout(() => {
    const loader = document.getElementById(loaderId);
    const contentWrapper = document.getElementById(contentWrapperId);

    if (loader && contentWrapper) {
      loader.classList.add("hidden"); // Hide skeleton loader
      contentWrapper.classList.remove("hidden"); // Show content
    }
  }, delay);
}
