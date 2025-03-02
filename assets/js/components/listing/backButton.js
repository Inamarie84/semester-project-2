import { createButton } from "../../utils/dom/listingHelpers.js";

export function createBackButton() {
  return createButton("← Back", "javascript:history.back()", [
    "mb-6",
    "text-footer",
    "font-semibold",
    "hover:underline",
  ]);
}
