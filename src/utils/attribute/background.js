import { getPatternOptions, getPatternRelations } from "./pattern";
import { defaultImageURL } from "../../data/constant";
import { get } from "../object";

export function getBackgroundOptions(options) {
  return [
    {
      type: "radio",
      key: "background.mode",
      name: "Mode",
      options: [
        { value: "image", label: "Image" },
        { value: "pattern", label: "Pattern" }
      ],
      relations: [
        {
          trigger: "image",
          actions: [
            {
              key: "background.imageURL",
              value: defaultImageURL
            }
          ]
        },
        {
          trigger: "pattern",
          actions: [
            {
              key: "background.type",
              value: "none"
            },
            {
              key: "background.color",
              value: "#000000"
            }
          ]
        }
      ]
    },
    ...getModeOptions(options)
  ];
}

function getModeOptions(options) {
  const mode = get(options, "background.mode");
  if (mode === "image") {
    return [
      {
        type: "image",
        key: "background.imageURL",
        name: "Image"
      }
    ];
  } else {
    return [
      {
        type: "select",
        key: "background.type",
        name: "Pattern",
        options: [
          { value: "none", label: "None" },
          { value: "line", label: "Line" },
          { value: "dot", label: "Dot" },
          { value: "wave", label: "Wave" }
        ],
        relations: [
          {
            trigger: "none",
            actions: [
              {
                key: "background.color",
                value: "#000000"
              }
            ]
          },

          ...getPatternRelations(options, "background")
        ]
      },
      {
        type: "children",
        children: getStyleOptions(options)
      }
    ];
  }
}

function getStyleOptions(options) {
  const type = get(options, "background.type");
  if (!type || type === "none") {
    return [
      {
        type: "color",
        key: "background.color",
        name: "Color"
      }
    ];
  } else {
    return getPatternOptions(options, "background");
  }
}
