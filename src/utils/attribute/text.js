import { getPatternRelations, getPatternOptions } from "./pattern";
import { get } from "../object";

export function getTextOptions(options) {
  return [
    {
      type: "text",
      key: "text.content",
      name: "Content",
      placeholder: "Please input title"
    },
    {
      name: "Text",
      type: "title"
    },
    {
      type: "children",
      children: [
        {
          type: "select",
          key: "text.mode",
          name: "Size",
          options: [
            { value: "none", label: "Normal" },
            { value: "autoFit", label: "Auto Fit" },
            { value: "constrain", label: "Constrain" }
          ],
          relations: [
            {
              trigger: "none",
              actions: [{ key: "text.fontSize", value: 200 }]
            },
            {
              trigger: "autoFit",
              actions: [
                {
                  key: "text.padding",
                  value: 0
                },
                {
                  key: "text.dy",
                  value: 0
                }
              ]
            },
            {
              trigger: "constrain",
              actions: [
                { key: "text.fontSize", value: 200 },
                {
                  key: "text.padding",
                  value: 50
                },
                {
                  key: "text.dy",
                  value: 0
                }
              ]
            }
          ]
        },
        ...getTextFontOptions(options)
      ]
    },
    {
      type: "select",
      key: "text.type",
      name: "Pattern",
      options: [
        { value: "none", label: "None" },
        { value: "line", label: "Line" },
        { value: "dot", label: "Dot" },
        { value: "wave", label: "Wave" }
      ],
      relations: getPatternRelations(options, "text")
    },
    {
      type: "children",
      children: getTextStyleOptions(options)
    }
  ];
}

function getTextFontOptions(options) {
  const mode = get(options, "text.mode");
  const fontSize = {
    type: "number",
    key: "text.fontSize",
    name: "Font Size",
    min: 50,
    max: 800
  };
  const padding = {
    type: "number",
    key: "text.padding",
    name: "Padding",
    min: 0,
    max: 200
  };
  const dy = {
    type: "number",
    key: "text.dy",
    name: "Offset Y",
    min: -200,
    max: 200
  };
  if (mode === "none") return [fontSize, dy];
  if (mode === "autoFit") return [padding, dy];
  if (mode === "constrain") return [fontSize, padding, dy];
}

function getTextStyleOptions(options) {
  const type = get(options, "text.type");
  if (!type || type === "none") {
    return [
      {
        type: "color",
        key: "text.color",
        name: "Color"
      }
    ];
  } else {
    return getPatternOptions(options, "text");
  }
}
