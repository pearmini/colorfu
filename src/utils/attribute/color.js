import { get } from "../object";

export function getColorOptions(options) {
  const groups = [getWordsKeys(options), getBackgroundKeys(options)];
  return {
    type: "color palette",
    name: "Palette",
    groups: groups.filter(d => d !== undefined)
  };
}

function getWordsKeys(options) {
  return getPatternKeys(options, "text", "Words");
}

function getPatternKeys(options, prefix, name) {
  const type = get(options, `${prefix}.type`);
  if (type === "none") {
    return {
      name: `${name} Pattern`,
      keys: [
        {
          name: "Color",
          key: `${prefix}.color`
        }
      ]
    };
  } else {
    return {
      name: `${name} Pattern`,
      keys: [
        {
          name: "Background Color",
          key: `${prefix}.color`
        },
        {
          name: "Foreground Color",
          key: `${prefix}.foregroundColor`
        }
      ]
    };
  }
}

function getBackgroundKeys(options) {
  const backgroundMode = get(options, "background.mode");
  if (backgroundMode === "image") return undefined;
  return getPatternKeys(options, "background", "Background");
}
