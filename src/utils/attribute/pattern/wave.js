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
      name: "Stroke Color",
      defaultValue: "#89E089"
    },
    {
      type: "number",
      key: "lineWidth",
      name: "Stroke",
      defaultValue: 0,
      min: 0,
      max: 20
    },
    {
      type: "number",
      key: "width",
      name: "Width",
      min: 10,
      max: 100,
      defaultValue: 50
    },
    {
      type: "number",
      key: "height",
      name: "Height",
      min: 10,
      max: 100,
      defaultValue: 50
    },
    {
      type: "number",
      key: "rotation",
      name: "Rotation",
      min: 0,
      max: 180,
      defaultValue: 0
    }
  ];
}
