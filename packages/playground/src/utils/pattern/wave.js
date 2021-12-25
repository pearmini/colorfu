export function wave(context, width, height, { backgroundColor, foregroundColor, lineWidth, arcRadius }) {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = foregroundColor;
  context.lineWidth = lineWidth;
  context.lineCap = 'square';
  const points = [
    { x: - width * (1 / 4) , y: height * (3 / 4) },
    { x: width * (1 / 4), y: height * (1 / 4) },
    { x: width * (3 / 4), y: height * (3 / 4) },
    { x: width * (5 / 4), y: height * (1 / 4) },
  ];
  const p = getPath(points, arcRadius);
  const path = new Path2D(p);
  context.stroke(path);
}

/**
 * arc path algorithm from: https://github.com/AlexSugak/react-svg-pathline
*/

const isCollinear = (p1, p2, p3) => {
  return (p1.y - p2.y) * (p1.x - p3.x) == (p1.y - p3.y) * (p1.x - p2.x);
}

const moveTo = (b, a, r) => {
  const vector = { x: b.x - a.x, y: b.y - a.y };
  const length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
  const unitVector = { x: vector.x / length, y: vector.y / length };
  return { x: a.x + unitVector.x * r, y: a.y + unitVector.y * r };
}

function getPath(points, r) {
  const path = points
    .slice(1)
    .reduce((acc, p, i, points) => {
      let next = points[i + 1];
      let prev = acc[acc.length - 1];

      if (next && !isCollinear(prev.point, p, next)) {
        let before = moveTo(prev.point, p, r);
        let after = moveTo(next, p, r);
        return acc.concat({
          point: p,
          s: `L ${before.x} ${before.y} S ${p.x} ${p.y} ${after.x} ${after.y} `
        })
      } else {
        return acc.concat({
          point: p,
          s: `L ${p.x} ${p.y} `
        })
      }
    }
      , [{
        point: points[0],
        s: `M ${points[0].x} ${points[0].y} `
      }])
    .map(p => p.s)
    .join('');

  return path;
}
