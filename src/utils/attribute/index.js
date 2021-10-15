import { getTextOptions } from "./text";
import { getBackgroundOptions } from "./background";

export function getAttributeOptions({ text, background }) {
  return {
    type: "container",
    children: [
      {
        type: "section",
        name: "Words",
        children: getTextOptions(text)
      },
      {
        type: "section",
        name: "Background",
        children: getBackgroundOptions(background)
      }
    ]
  };
}
