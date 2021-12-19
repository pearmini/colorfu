import { deepCopy, set } from "./object";

export function adaptOptions(options, scale) {
  const newOptions = deepCopy(options);
  set(newOptions, "text.mode", "autoFit");
  set(newOptions, "text.dy", 30);
  set(newOptions, "text.padding", 0);

  // 缩放一些数值属性
  // 防止变换之后看上去不一致
  const { text, background } = newOptions;
  [text, background].forEach((obj) => {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (typeof value === "number" && key !== "rotation") {
        obj[key] = value * scale;
      }
    }
  });
  return newOptions;
}
