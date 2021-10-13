import { getPatternRelations, getPatternOptions } from "./pattern";

export function getTextOptions(type) {
  return [
    {
      type: "text",
      key: "text.content",
      name: "Content",
      placeholder: "Please input title"
    },
    {
      type: "number",
      key: "text.fontSize",
      name: "Font Size",
      min: 10,
      max: 300
    },
    {
      type: "select",
      key: "text.type",
      name: "Pattern",
      options: [
        { value: "none", label: "None" },
        { value: "line", label: "Line" }
      ],
      relations: getPatternRelations("text")
    },
    {
      type: "children",
      children: getTextStyleOptions(type)
    }
  ];
}

export function getTextStyleOptions(type) {
  if (!type || type === "none") {
    return [
      {
        type: "color",
        key: "text.color",
        name: "Color"
      }
    ];
  } else {
    return getPatternOptions(type, "text");
  }
}
