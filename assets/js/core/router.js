export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home/home.js");
      break;
    // case "/auth/":
    //   await import("./views/auth.js");
    //   break;
    case "/auth/login.html":
      await import("./views/auth/login.js");
      break;
    case "/auth/register.html":
      await import("./views/auth/register.js");
      break;
    case "/profile/index.html":
      await import("./views/profile/profile.js");
      break;
    case "/listing/create-listing.html":
      await import("./views/listing/createListing.js");
      break;
    case "/listing/single-listing.html":
      await import("./views/listing/singleListing.js");
      break;

    // default:
    //   await import("./views/notFound.js");
  }
}
