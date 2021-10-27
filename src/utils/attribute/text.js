import { getPatternRelations, getPatternStyleOptions } from "./pattern";
import { get } from "../object";

export function getTextOptions(options) {
  return [
    {
      type: "symbol-text",
      key: "text.content",
      name: "Content",
      placeholder: "Please input title"
    },
    {
      name: "Text",
      type: "collapse",
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
      type: "collapse",
      name: "Pattern",
      defaultOpen: false,
      children: [
        {
          type: "select",
          key: "text.type",
          name: "Type",
          options: [
            { value: "none", label: "None" },
            { value: "line", label: "Line" },
            { value: "dot", label: "Dot" },
            { value: "wave", label: "Wave" }
          ],
          relations: getPatternRelations(options, "text")
        },
        ...getTextStyleOptions(options)
      ]
    }
  ];
}

function getTextFontOptions(options) {
  const mode = get(options, "text.mode");
  const fontSize = {
    type: "number",
    key: "text.fontSize",
    name: "Font Size",
    min: 50
  };
  const padding = {
    type: "number",
    key: "text.padding",
    name: "Padding",
    min: 0
  };
  const dy = {
    type: "number",
    key: "text.dy",
    name: "Offset Y"
  };
  if (mode === "none") return [fontSize, dy];
  if (mode === "autoFit") return [padding, dy];
  if (mode === "constrain") return [fontSize, padding, dy];
}

function getTextStyleOptions(options) {
  const type = get(options, "text.type");
  if (!type || type === "none") {
    return [];
  } else {
    return getPatternStyleOptions(options, "text");
  }
}
