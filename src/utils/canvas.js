export function createContext(canvas, width, height) {
  canvas.height = height * 2;
  canvas.width = width * 2;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const context = canvas.getContext("2d");
  context.scale(2, 2);
  return context;
}

export async function drawColorWords(
  canvas,
  width,
  height,
  { bgColor, fontSize, fontFamily, textColor, title }
) {
  const context = createContext(canvas, width, height);
  context.fillStyle = bgColor;
  context.fillRect(0, 0, width, height);
  context.font = `${fontSize}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = textColor;
  context.fillText(title, width / 2, height / 2);
}

export function drawPatternWords() {}

export function drawImageWords() {}
