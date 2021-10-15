import { getPatternOptions, getPatternRelations } from "./pattern";

export function getBackgroundOptions({ type }) {
  return [
    {
      type: "select",
      key: "background.type",
      name: "Pattern",
      options: [
        { value: "none", label: "None" },
        { value: "image", label: "Image" },
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
        {
          trigger: "image",
          actions: [
            {
              key: "background.imageURL",
              value: "https://i.loli.net/2021/09/04/drBtUVNhlq87Rwc.jpg"
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

function getStyleOptions(type) {
  if (!type || type === "none") {
    return [
      {
        type: "color",
        key: "background.color",
        name: "Color"
      }
    ];
  } else if (type === "image") {
    return [
      {
        type: "image",
        key: "background.imageURL",
        name: "Image"
      }
    ];
  } else {
    return getPatternOptions(type, "background");
  }
}
