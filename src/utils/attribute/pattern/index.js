import { line } from "./line";
import { dot } from "./dot";
import { wave } from "./wave";
import { square } from "./square";
import { get } from "../../object";

const nameCreator = {
  line,
  dot,
  wave,
  square
};

export function getPatternOptions(options, prefix) {
  const type = get(options, `${prefix}.type`);
  const creator = nameCreator[type] || line;
  return creator(options).map(({ key, ...rest }) => ({
    key: `${prefix}.${key}`,
    ...rest
  }));
}

export function getPatternStyleOptions(options, prefix) {
  const o = getPatternOptions(options, prefix);
  return o.filter(d => d.type !== "color");
}

export function getPatternColorOptions(options, prefix, prefixName) {
  const o = getPatternOptions(options, prefix);
  return o
    .filter(d => d.type === "color")
    .map(({ name, ...rest }) => ({
      name: `${prefixName} - ${name}`,
      ...rest
    }));
}

export function getPatternRelations(options, prefix) {
  return Object.entries(nameCreator).map(([name, creator]) => ({
    trigger: name,
    actions: creator(options).map(({ key, defaultValue }) => ({
      key: `${prefix}.${key}`,
      value: defaultValue
    }))
  }));
}
