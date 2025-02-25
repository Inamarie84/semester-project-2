export function filterExpiredListings(listings) {
  const now = new Date();
  return listings.filter((listing) => new Date(listing.endsAt) >= now);
}
