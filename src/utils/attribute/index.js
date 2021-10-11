export function getAttributeOptions(textType, backgroundType) {
  return {
    type: "container",
    children: [
      {
        type: "section",
        name: "Text",
        children: getTextOptions(textType)
      },
      {
        type: "section",
        name: "Background",
        children: getBackgroundOptions(backgroundType)
      }
    ]
  };
}

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
    ...getTextStyleOptions(type)
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

export function getBackgroundOptions(type) {
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

export function getPatternOptions(type, prefix) {
  if (type === "line") {
    return [
      {
        type: "color",
        key: `${prefix}.color`,
        name: "Background Color"
      },
      {
        type: "color",
        key: `${prefix}.foregroundColor`,
        name: "Foreground Color"
      },
      {
        type: "number",
        key: `${prefix}.width`,
        name: "Width",
        min: 10,
        max: 100
      },
      {
        type: "number",
        key: `${prefix}.rotation`,
        name: "Rotation",
        min: 0,
        max: Math.PI
      }
    ];
  }
}
