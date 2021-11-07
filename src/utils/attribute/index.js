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
        help:
          "You can set all attributes related to color here. You can set each of them directly through color input, or add some colors from color store and drag to it.",
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
        help:
          "You can set attributes related to foreground words here. The words can auto fit the wallpaper, or compress to be constrained in it or simply use font size.",
        children: getTextOptions(options)
      },
      {
        type: "section",
        name: "Background",
        help:
          "You can set attributes relate to background here. It can be an image or just some colors.",
        children: getBackgroundOptions(options)
      }
    ]
  };
}
