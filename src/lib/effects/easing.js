export function easeExpoOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

export function easeSineOut(t) {
  return Math.sin(t * Math.PI / 2);
}
