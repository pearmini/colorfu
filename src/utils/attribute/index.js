import { color } from "./color";
export function getAttributeOptions(type) {
  if (type === "color") {
    return color;
  }
}
