export function line(context, width, height, { backgroundColor, foregroundColor }) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = foregroundColor;
  context.beginPath();
  context.moveTo(width, 0);
  context.lineTo(width, height);
  context.stroke();
}
