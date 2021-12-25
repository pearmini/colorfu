export function square() {
  return [
    {
      type: "color",
      key: "color",
      name: "Background Color",
      defaultValue: "#000"
    },
    {
      type: "color",
      key: "fillColor",
      name: "Fill Color",
      defaultValue: "#000"
    },
    {
      type: "number",
      key: "size",
      name: "Size",
      defaultValue: 20,
      min: 0
    },
    {
      type: "color",
      key: "strokeColor",
      name: "Stroke Color",
      defaultValue: "#000"
    },
    {
      type: "number",
      key: "lineWidth",
      name: "Stroke Width",
      defaultValue: 0,
      min: 0
    },
    {
      type: "number",
      key: "width",
      name: "Width",
      min: 10,
      defaultValue: 40
    },
    {
      type: "number",
      key: "height",
      name: "Height",
      min: 10,
      defaultValue: 40
    },
    {
      type: "number",
      key: "rotation",
      name: "Rotation",
      defaultValue: 0
    },
    {
      type: "boolean",
      key: "staggered",
      name: "Staggered",
      defaultValue: true
    }
  ];
}
