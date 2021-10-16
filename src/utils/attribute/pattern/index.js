import { options as line } from "./line";
import { options as dot } from "./dot";
import { options as wave } from "./wave";

const nameOptions = {
  line,
  dot,
  wave
};

export function getPatternOptions(type, prefix) {
  const options = nameOptions[type] || line;
  return options.map(({ key, ...rest }) => ({
    key: `${prefix}.${key}`,
    ...rest
  }));
}

export function getPatternRelations(prefix) {
  return Object.entries(nameOptions).map(([name, options]) => ({
    trigger: name,
    actions: options.map(({ key, defaultValue }) => ({
      key: `${prefix}.${key}`,
      value: defaultValue
    }))
  }));
}
