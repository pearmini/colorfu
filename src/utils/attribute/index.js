import { getTextOptions } from "./text";
import { getBackgroundOptions } from "./background";

export function getAttributeOptions(textType, backgroundType) {
  return {
    type: "container",
    children: [
      {
        type: "section",
        name: "Text",
        children: getTextOptions(textType)
      },
      {
        type: "section",
        name: "Background",
        children: getBackgroundOptions(backgroundType)
      }
    ]
  };
}
