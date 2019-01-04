export function easeExpoOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

export function easeSineOut(t) {
  return Math.sin(t * Math.PI / 2);
}

export function easeQuadOut(t) {
  return t * (2 - t);
}

const tau = 2 * Math.PI;

export const elasticOutConfig = (amp, period) => {
  const s = Math.asin(1 / (amp = Math.max(1, amp))) * (period /= tau);

  return (t) => { const v = 1 - amp * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / period); console.log(t, v); return v; };
}
