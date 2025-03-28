import { getTextOptions } from "./text";
import { getBackgroundOptions } from "./background";
import { getColorOptions } from "./color";
import COLOR_PALETTE from "../../assets/images/color-palette.gif";
import SIZE_PREVIEW from "../../assets/images/size-preview.png";
import BACKGROUND_PREVIEW from "../../assets/images/background-preivew.png";

export function getAttributeOptions(options) {
  return {
    type: "container",
    children: [
      {
        type: "section",
        name: "Colors",
        help: `
        <p style="color: #606266;font-size:14px;line-height: 1.4;">Sets attributes related to color here.</p>
        <img  src=${COLOR_PALETTE} />
        `,
        children: [
          {
            type: "collapse",
            name: "Color Palette",
            defaultOpen: true,
            indent: false,
            children: [
              {
                type: "color-palette",
              },
            ],
          },
          ...getColorOptions(options),
        ],
      },
      {
        type: "section",
        name: "Words",
        help: `
        <p style="color: #606266;font-size:14px;line-height: 1.4;">Sets attributes related to foreground words here.</p>
        <img src=${SIZE_PREVIEW} width="100%"/>
        `,
        children: getTextOptions(options),
      },
      {
        type: "section",
        name: "Background",
        help: `
        <p style="color: #606266;font-size:14px;line-height: 1.4;">Sets attributes relate to background here.</p>
        <img src=${BACKGROUND_PREVIEW} width="100%"/>
        `,
        children: getBackgroundOptions(options),
      },
    ],
  };
}
