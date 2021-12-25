export function getTextFontSize(text, containerWidth, containerHeight, font) {
  const [textWidth, textHeight] = measureMultilineTextByDOM(text, font);
  const sx = (containerWidth / textWidth) * 0.8;
  const sy = containerHeight / textHeight;
  const scale = Math.min(sx, sy);
  return font.fontSize * scale;
}

export function measureTextByDOM(text, font) {
  const span = createSpan();

  span.style.fontSize = `${font.fontSize}px`;
  span.style.fontFamily = font.fontFamily;
  span.style.fontWeight = font.fontWeight;
  span.style.fontStyle = font.fontStyle;
  span.style.fontVariant = font.fontVariant;

  span.innerHTML = text;

  return [span.clientWidth, span.clientHeight];
}

export function measureMultilineTextByDOM(text, font) {
  const lines = text.split("\n");
  return lines.reduce(
    (size, line) => {
      const [width, height] = measureTextByDOM(line, font);
      const maxWidth = Math.max(size[0], width);
      const totalHeight = size[1] + height;
      return [maxWidth, totalHeight];
    },
    [-Infinity, 0]
  );
}

let measureTextSpan;
function createSpan() {
  if (measureTextSpan) return measureTextSpan;
  measureTextSpan = document.createElement("span");
  // 不显示在视窗
  measureTextSpan.style.visibility = "hidden";
  measureTextSpan.style.position = "absolute";
  measureTextSpan.style.display = "inline";
  measureTextSpan.style.left = "-10000px";
  measureTextSpan.style.top = "-10000px";

  document.body.appendChild(measureTextSpan);

  return measureTextSpan;
}
