export function wave(context, width, height, { backgroundColor, foregroundColor, lineWidth }) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = foregroundColor;
  context.lineWidth = lineWidth;
  context.lineCap = 'square';
  context.beginPath();
  context.moveTo(0, height * (3 / 4));
  context.lineTo(width * (1 / 2), height * (1 / 4));
  context.lineTo(width, height * (3 / 4));
  context.stroke();
}
