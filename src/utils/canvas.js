export function createContext(canvas, width, height) {
  canvas.height = height * 2;
  canvas.width = width * 2;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const context = canvas.getContext("2d");
  context.scale(2, 2);
  return context;
}

export function createCanvas() {
  return document.createElement("canvas");
}

export function drawWords(
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

function createPattern(
  containerContext,
  { type, width = 50, height = 50, rotation = 0, ...options }
) {
  const canvas = createCanvas();
  const context = createContext(canvas, width, height);

  switch (type) {
    case "line":
      line(context, width, height, options);
      break;
  }

  const pattern = containerContext.createPattern(canvas, "repeat");
  const matrix = transformMatrix(2, rotation);
  pattern.setTransform(matrix);

  return pattern;
}

function transformMatrix(dpr, rotation) {
  const radian = (rotation * Math.PI) / 180;
  const matrix = {
    a: Math.cos(radian) * (1 / dpr),
    b: Math.sin(radian) * (1 / dpr),
    c: -Math.sin(radian) * (1 / dpr),
    d: Math.cos(radian) * (1 / dpr),
    e: 0,
    f: 0,
  };
  return matrix;
}

function line(context, width, height, { backgroundColor, patternColor }) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = patternColor;
  context.beginPath();
  context.moveTo(50, 0);
  context.lineTo(50, 50);
  context.stroke();
}
