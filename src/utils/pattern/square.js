export function square(context, width, height, { backgroundColor, strokeColor, lineWidth, fillColor, size, staggered }) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = strokeColor;
  context.lineWidth = lineWidth;
  context.fillStyle = fillColor;
  context.beginPath();
  if(staggered) {
    context.rect(width * (1/4) - size/2, height * (1/4) - size/2, size, size);
    context.rect(width * (3/4) - size/2, height * (3/4) - size/2, size, size);
  } else {
    context.rect(width * (1/4) - size/2, height * (1/4) - size/2, size, size);
    context.rect(width * (1/4) - size/2, height * (3/4) - size/2, size, size);
    context.rect(width * (3/4) - size/2, height * (3/4) - size/2, size, size);
    context.rect(width * (3/4) - size/2, height * (1/4) - size/2, size, size);
  }
    context.fill();
    context.stroke();
}
