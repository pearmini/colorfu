export function line(context, width, height, { backgroundColor, foregroundColor, lineWidth }) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = foregroundColor;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(width, 0);
  context.lineTo(width, height);
  context.stroke();
}
