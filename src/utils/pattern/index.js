import { createCanvas, createContext } from "../canvas";
import { line } from "./line";
import { createMatrix } from "../math";

export function createPattern(
  containerContext,
  {
    type,
    width = 50,
    height = 50,
    rotation = 0,
    repetition = "repeat",
    ...options
  }
) {
  const canvas = createCanvas();
  const context = createContext(canvas, width, height);

  switch (type) {
    case "line":
      line(context, width, height, options);
      break;
  }

  const pattern = containerContext.createPattern(canvas, repetition);
  const matrix = createMatrix(0.5, rotation);
  pattern.setTransform(matrix);

  return pattern;
}
