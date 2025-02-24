// // assets/js/utils/listings/domHelpers.js
// export function createImageElement(media) {
//   const imageContainer = document.createElement("div");
//   imageContainer.classList.add("w-full", "mb-3");

//   const mainImage = document.createElement("img");
//   mainImage.classList.add("w-full", "h-64", "object-cover", "rounded-md");
//   mainImage.src =
//     media && media[0]
//       ? media[0].url
//       : "https://via.placeholder.com/300x200?text=No+Image+Available";
//   mainImage.alt = media && media[0] ? media[0].alt : "Listing Image";

//   imageContainer.appendChild(mainImage);

//   return imageContainer;
// }

// export function createTags(tags) {
//   const tagsContainer = document.createElement("div");
//   tagsContainer.classList.add(
//     "flex",
//     "flex-wrap",
//     "justify-center",
//     "gap-2",
//     "mt-3",
//   );

//   if (Array.isArray(tags) && tags.length > 0) {
//     tags.forEach((tag) => {
//       const tagElement = document.createElement("span");
//       tagElement.textContent = `#${tag}`;
//       tagElement.classList.add(
//         "bg-light-bg",
//         "text-gray-700",
//         "px-2",
//         "py-1",
//         "text-xs",
//         "rounded-full",
//       );
//       tagsContainer.appendChild(tagElement);
//     });
//   } else {
//     const noTags = document.createElement("span");
//     noTags.textContent = "No tags available";
//     noTags.classList.add("text-xs", "text-gray-500");
//     tagsContainer.appendChild(noTags);
//   }

//   return tagsContainer;
// }

// assets/js/utils/listings/domHelpers.js

export function createImageElement(media) {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("w-full", "mb-3");

  const mainImage = document.createElement("img");
  mainImage.classList.add("w-full", "h-64", "object-cover", "rounded-md");
  mainImage.src =
    media && media[0]
      ? media[0].url
      : "https://via.placeholder.com/300x200?text=No+Image+Available";
  mainImage.alt = media && media[0] ? media[0].alt : "Listing Image";

  imageContainer.appendChild(mainImage);

  if (media && media.length > 1) {
    const galleryButton = document.createElement("button");
    galleryButton.classList.add(
      "mt-2",
      "text-header",
      "underline",
      "hover:text-footer",
      "focus:outline-none",
    );
    galleryButton.textContent = "View Media Gallery";

    galleryButton.addEventListener("click", () => {
      openGalleryModal(media);
    });

    imageContainer.appendChild(galleryButton);
  }

  return imageContainer;
}

export function createTags(tags) {
  const tagsContainer = document.createElement("div");
  tagsContainer.classList.add(
    "flex",
    "flex-wrap",
    "justify-center",
    "gap-2",
    "mt-3",
  );

  if (Array.isArray(tags) && tags.length > 0) {
    tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.textContent = `#${tag}`;
      tagElement.classList.add(
        "bg-light-bg",
        "text-gray-700",
        "px-2",
        "py-1",
        "text-xs",
        "rounded-full",
      );
      tagsContainer.appendChild(tagElement);
    });
  } else {
    const noTags = document.createElement("span");
    noTags.textContent = "No tags available";
    noTags.classList.add("text-xs", "text-gray-500");
    tagsContainer.appendChild(noTags);
  }

  return tagsContainer;
}

export function createButton(label, link, classes) {
  const button = document.createElement("a");
  button.href = link;
  button.textContent = label;
  button.classList.add(...classes);
  return button;
}

export function openGalleryModal(media) {
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed",
    "inset-0",
    "bg-gray-800",
    "bg-opacity-75",
    "flex",
    "items-center",
    "justify-center",
    "z-50",
  );

  const modalContent = document.createElement("div");
  modalContent.classList.add(
    "bg-white",
    "p-4",
    "rounded-lg",
    "max-w-lg",
    "w-full",
  );

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.classList.add(
    "absolute",
    "top-4",
    "right-4",
    "text-light-bg",
    "hover:text-gray-700",
  );
  closeButton.addEventListener("click", () => modal.remove());

  const gallery = document.createElement("div");
  gallery.classList.add("grid", "grid-cols-2", "sm:grid-cols-3", "gap-2");

  media.forEach((image) => {
    const img = document.createElement("img");
    img.classList.add("w-full", "h-32", "object-cover", "rounded-md");
    img.src = image.url;
    img.alt = image.alt || "Listing Image";
    gallery.appendChild(img);
  });

  modalContent.appendChild(closeButton);
  modalContent.appendChild(gallery);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}
