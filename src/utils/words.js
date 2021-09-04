import { createPattern } from "./pattern";
import { createContext } from "./canvas";

function drawWords(
  type,
  canvas,
  width,
  height,
  { fontSize, fontFamily, title, background, text }
) {
  const context = createContext(canvas, width, height);
  const { backgroundFillStyle, textFillStyle } = chooseFillStyle(type, {
    background,
    text,
    context,
  });
  context.fillStyle = backgroundFillStyle;
  context.fillRect(0, 0, width, height);
  context.font = `${fontSize}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = textFillStyle;
  context.fillText(title, width / 2, height / 2);
}

export function drawColorWords(...args) {
  drawWords("color", ...args);
}

export function drawPatternWords(...args) {
  drawWords("pattern", ...args);
}

export function drawImageWords() {}

function chooseFillStyle(type, { background, text, context }) {
  if (type === "color") {
    return {
      backgroundFillStyle: background,
      textFillStyle: text,
    };
  } else if (type === "pattern") {
    return {
      backgroundFillStyle: createPattern(context, background),
      textFillStyle: createPattern(context, text),
    };
  }
}
