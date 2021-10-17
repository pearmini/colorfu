import { getTextOptions } from "./text";
import { getBackgroundOptions } from "./background";

export function getAttributeOptions(options) {
  return {
    type: "container",
    children: [
      {
        type: "section",
        name: "Words",
        children: getTextOptions(options)
      },
      {
        type: "section",
        name: "Background",
        children: getBackgroundOptions(options)
      }
    ]
  };
}
