import tinyColor from 'tinycolor2';

export function toState(color) {
  let tnColor = new tinyColor(color);
  // console.log(tnColor.toHsl());
  console.log(tnColor.toRgb());
  return {
    hsv: tnColor.toHsv(),
    hsl: tnColor.toHsl(),
    rgb: tnColor.toRgb(),
    hex: tnColor.toHex(),
    rgbString: tnColor.toRgbString()
  }
}