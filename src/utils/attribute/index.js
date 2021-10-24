import { getTextOptions } from "./text";
import { getBackgroundOptions } from "./background";
import { getColorOptions } from "./color";

export function getAttributeOptions(options) {
  return {
    type: "container",
    children: [
      getColorOptions(options),
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
