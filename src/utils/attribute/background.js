import { getPatternStyleOptions, getPatternRelations } from "./pattern";
import { defaultImageURL } from "../../data/image";
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
        type: "collapse",
        name: "Pattern",
        defaultOpen: false,
        children: [
          {
            type: "select",
            key: "background.type",
            name: "Type",
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
          ...getStyleOptions(options)
        ]
      }
    ];
  }
}

function getStyleOptions(options) {
  const type = get(options, "background.type");
  if (!type || type === "none") {
    return [];
  } else {
    return getPatternStyleOptions(options, "background");
  }
}
