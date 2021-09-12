export function createContext(canvas, width, height) {
  const pixelRatio = window.pixelRatio || 2;
  canvas.height = height * pixelRatio;
  canvas.width = width * pixelRatio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const context = canvas.getContext("2d");
  context.scale(pixelRatio, pixelRatio);
  return context;
}

export function createCanvas() {
  return document.createElement("canvas");
}
