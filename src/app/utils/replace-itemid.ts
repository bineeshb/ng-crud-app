import { placeholderItemID } from "@config/api-urls";

export const replaceItemID = (url: string, itemId: string): string => {
  return url.replace(placeholderItemID, itemId);
};
