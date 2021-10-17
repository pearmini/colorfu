export function line() {
  return [
    {
      type: "color",
      key: "color",
      name: "Background Color",
      defaultValue: "#000"
    },
    {
      type: "color",
      key: "foregroundColor",
      name: "Stroke Color",
      defaultValue: "#89E089"
    },
    {
      type: "number",
      key: "lineWidth",
      name: "Stroke Width",
      defaultValue: 1,
      min: 1,
    },
    {
      type: "number",
      key: "width",
      name: "Width",
      min: 10,
      defaultValue: 50
    },
    {
      type: "number",
      key: "rotation",
      name: "Rotation",
      defaultValue: 0
    }
  ];
}
