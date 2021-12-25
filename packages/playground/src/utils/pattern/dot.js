export function dot(context, width, height, { backgroundColor, strokeColor, lineWidth, fillColor, size }) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = strokeColor;
  context.lineWidth = lineWidth;
  context.fillStyle = fillColor;
  context.beginPath();
  context.arc(width / 2, height / 2, size / 2, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
}
