import tinyColor from 'tinycolor2';

export function toState(color) {
  let tnColor = new tinyColor(color);
  // console.log(tnColor.toHsl());
  // console.log(tnColor.toHsv());
  return {
    hsv: tnColor.toHsv(),
    hsl: tnColor.toHsl(),
    hex: tnColor.toHexString(),
  }
}