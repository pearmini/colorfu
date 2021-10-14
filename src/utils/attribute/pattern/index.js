import { options as line } from "./line";

const nameOptions = {
  line
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
