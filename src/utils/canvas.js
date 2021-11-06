export function createContext(canvas, width, height) {
  const pixelRatio = window.pixelRatio || 2;
  canvas.height = height * pixelRatio;
  canvas.width = width * pixelRatio;
  const context = canvas.getContext("2d");
  context.scale(pixelRatio, pixelRatio);
  return context;
}

export function createCanvas() {
  return document.createElement("canvas");
}
