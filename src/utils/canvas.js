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
