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
  context.moveTo(50, 0);
  context.lineTo(50, 50);
  context.stroke();
}
