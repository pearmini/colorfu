import { createPattern } from "./pattern";
import { createContext } from "./canvas";

export function drawColorWords(
  canvas,
  width,
  height,
  { background, text, ...options }
) {
  const context = createContext(canvas, width, height);
  drawBackgroundWords(context, width, height, {
    ...options,
    backgroundStyle: background,
    textStyle: text,
  });
}

export function drawPatternWords(
  canvas,
  width,
  height,
  { background, text, ...options }
) {
  const context = createContext(canvas, width, height);
  drawBackgroundWords(context, width, height, {
    ...options,
    backgroundStyle: createPattern(context, background),
    textStyle: createPattern(context, text),
  });
}

export function drawImageWords(
  canvas,
  width,
  height,
  { fontSize, fontFamily, title, text, image }
) {
  const context = createContext(canvas, width, height);
  drawImage(context, image, width, height);
  drawTitle(context, title, width, height, text, fontSize, fontFamily);
}

function drawBackgroundWords(
  context,
  width,
  height,
  { fontSize, fontFamily, title, backgroundStyle, textStyle }
) {
  drawBackground(context, width, height, backgroundStyle);
  drawTitle(context, title, width, height, textStyle, fontSize, fontFamily);
}

function drawBackground(context, width, height, style) {
  context.fillStyle = style;
  context.fillRect(0, 0, width, height);
}

function drawTitle(context, title, width, height, style, fontSize, fontFamily) {
  context.font = `${fontSize}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = style;
  context.fillText(title, width / 2, height / 2);
}

function drawImage(context, image, width, height) {
  const { width: imageWidth, height: imageHeight } = image;
  const imageAspect = imageHeight / imageWidth;
  const contextAspect = height / width;
  let sw, sh;
  if (imageAspect > contextAspect) {
    sw = imageWidth;
    sh = sw * contextAspect;
  } else {
    sh = imageHeight;
    sw = sh / contextAspect;
  }
  const sx = (imageWidth - sw) / 2;
  const sy = (imageHeight - sh) / 2;
  context.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
}
