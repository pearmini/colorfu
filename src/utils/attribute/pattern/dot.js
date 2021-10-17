export const options = [
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
    defaultValue: 2,
    min: 0,
    // max: 20
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
    name: "Stroke",
    defaultValue: 0,
    min: 1,
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
