import { color } from "./color";
import { image } from "./image";

export function getAttributeOptions(type) {
  if (type === "color") {
    return color;
  } else if (type === "image") {
    return image;
  }
}
