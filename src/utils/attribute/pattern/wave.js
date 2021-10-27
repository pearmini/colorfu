export function wave() {
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
      name: "Line Color",
      defaultValue: "#89E089"
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
      defaultValue: 50
    },
    {
      type: "number",
      key: "height",
      name: "Height",
      min: 10,
      defaultValue: 50
    },
    {
      type: "number",
      key: "arcRadius",
      name: "ArcRadius",
      defaultValue: 0
    },
    {
      type: "number",
      key: "rotation",
      name: "Rotation",
      defaultValue: 0
    }
  ];
}
