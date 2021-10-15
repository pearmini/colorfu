import { createPattern } from "./pattern";
import { createContext } from "./canvas";
import { measureTextByDOM, getTextFontSize } from "./text";

export function drawWallpaper(canvas, width, height, options) {
  const context = createContext(canvas, width, height);
  const { text: textOptions, background: backgroundOptions } = options;
  drawBackground(context, width, height, backgroundOptions);
  drawText(context, width, height, textOptions);
}

function isColor(type) {
  return !type || type === "none";
}

function drawBackground(context, width, height, { type, image, color, ...options }) {
  if (type === "image") {
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
  {
    color,
    type,
    fontSize,
    fontFamily,
    content,
    constrain = false,
    autoFit = false,
    padding = 50,
    dy = 0,
    ...options
  }
) {
  const fillStyle = isColor(type)
    ? color
    : createPattern(context, { backgroundColor: color, type, ...options });

  const finalFontSize = autoFit
    ? getTextFontSize(content, width, { fontSize: 200, fontFamily })
    : fontSize;

  context.font = `${finalFontSize}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = fillStyle;
  context.save();

  // constrain words within the container
  if (!autoFit || constrain) {
    const font = {
      fontSize: finalFontSize,
      fontFamily
    };
    const [textWidth, textHeight] = measureTextByDOM(content, font);
    const containerWidth = width - padding * 2;
    const containerHeight = width - padding * 2;
    const sx = textWidth > containerWidth ? containerWidth / textWidth : 1;
    const sy = textHeight > containerHeight ? containerHeight / textHeight : 1;
    context.translate(width / 2, height / 2 + dy);
    context.scale(sx, sy);
    context.translate(-width / 2, -height / 2);
  }

  context.fillText(content, width / 2, height / 2);
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
