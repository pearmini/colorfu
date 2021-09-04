export function line(
  context,
  width,
  height,
  { backgroundColor, patternColor }
) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = patternColor;
  context.beginPath();
  context.moveTo(width, 0);
  context.lineTo(width, height);
  context.stroke();
}
