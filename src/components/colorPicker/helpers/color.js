import tinyColor from 'tinycolor2';

export function toState(color) {
  let tnColor = new tinyColor(color);
  
  return {
    hsv: tnColor.toHsv(),
    hsl: tnColor.toHsl(),
  }
}