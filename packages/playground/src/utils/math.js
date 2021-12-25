export function map(v, d0, d1, r0, r1) {
  const t = (v - d0) / (d1 - d0);
  return r0 * (1 - t) + r1 * t;
}

export function constrain(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function createMatrix(scale, rotation) {
  const radian = (rotation * Math.PI) / 180;
  const matrix = {
    a: Math.cos(radian) * scale,
    b: Math.sin(radian) * scale,
    c: -Math.sin(radian) * scale,
    d: Math.cos(radian) * scale,
    e: 0,
    f: 0,
  };
  return matrix;
}
