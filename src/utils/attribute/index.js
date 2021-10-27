import { getTextOptions } from "./text";
import { getBackgroundOptions } from "./background";
import { getColorOptions } from "./color";

export function getAttributeOptions(options) {
  return {
    type: "container",
    children: [
      {
        type: "section",
        name: "Colors",
        children: [
          {
            type: "collapse",
            name: "Color Palette",
            defaultOpen: true,
            indent: false,
            children: [
              {
                type: "color-palette"
              }
            ]
          },
          ...getColorOptions(options)
        ]
      },
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
