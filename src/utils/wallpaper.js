import { createPattern } from "./pattern";
import { createContext } from "./canvas";
import { measureTextByDOM, getTextFontSize, measureMultilineTextByDOM } from "./text";

export function drawWallpaper(canvas, width, height, options) {
  const context = createContext(canvas, width, height);
  const { text: textOptions, background: backgroundOptions } = options;
  drawBackground(context, width, height, backgroundOptions);
  drawText(context, width, height, textOptions);
}

function isColor(type) {
  return !type || type === "none";
}

function drawBackground(context, width, height, { type, image, color, mode, ...options }) {
  if (mode === "image") {
    drawImage(context, image, width, height);
  } else {
    const fillStyle = isColor(type)
      ? color
      : createPattern(context, { backgroundColor: color, type, ...options });
    context.fillStyle = fillStyle;
    context.fillRect(0, 0, width, height);
  }
}

function drawText(
  context,
  width,
  height,
  { color, type, fontSize, fontFamily, content, mode = "none", padding = 50, dy = 0, ...options }
) {
  const fillStyle = isColor(type)
    ? color
    : createPattern(context, { backgroundColor: color, type, ...options });

  const containerWidth = width - padding * 2;
  const containerHeight = width - padding * 2;
  const finalFontSize =
    mode === "autoFit"
      ? getTextFontSize(content, containerWidth, containerHeight, { fontSize: 200, fontFamily })
      : fontSize;

  context.font = `bolder ${finalFontSize}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = fillStyle;
  context.save();

  // constrain words within the container
  const font = {
    fontSize: finalFontSize,
    fontFamily,
  };
  const x = width / 2;
  const y = height / 2 + dy;
  if (mode === "constrain") {
    const [textWidth, textHeight] = measureMultilineTextByDOM(content, font);
    const sx = textWidth > containerWidth ? containerWidth / textWidth : 1;
    const sy = textHeight > containerHeight ? containerHeight / textHeight : 1;
    context.translate(x, y);
    context.scale(sx, sy);
    context.translate(-x, -y);
  }

  drawMultilineText(context, content, x, y, font);
  context.restore();
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

function drawMultilineText(context, content, centerX, centerY, font) {
  const lines = content.split("\n");
  const [, textHeight] = measureTextByDOM(lines[0], font);
  const totalHeight = textHeight * (lines.length - 1);
  const y = centerY - totalHeight / 2;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    context.fillText(line, centerX, y + i * textHeight);
  }
}
