import { getPatternOptions, getPatternRelations } from "./pattern";

export function getBackgroundOptions({ type, mode }) {
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
              value: "https://i.loli.net/2021/09/04/drBtUVNhlq87Rwc.jpg"
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
    ...getModeOptions(mode, type)
  ];
}

function getModeOptions(mode, type) {
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
          { value: "line", label: "Line" }
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

          ...getPatternRelations("background")
        ]
      },
      {
        type: "children",
        children: getStyleOptions(type)
      }
    ];
  }
}

function getStyleOptions(type) {
  if (!type || type === "none") {
    return [
      {
        type: "color",
        key: "background.color",
        name: "Color"
      }
    ];
  } else {
    return getPatternOptions(type, "background");
  }
}
