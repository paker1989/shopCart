import tinyColor from 'tinycolor2';

export function toState(color) {
  let tnColor = new tinyColor(color);

  return {
    hsv: tnColor.toHsv(),
    hsl: tnColor.toHsl(),
    rgb: tnColor.toRgb(),
    hex: tnColor.toHex(),
    rgbString: tnColor.toRgbString()
  }
}

export function simpleValidColor(color) {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
  let checked, passed;
  keysToCheck.forEach((letter, index) => {
    const v = color[letter];
    if (v) {
      checked++;
    }
    if (Number(v) && !isNaN(Number(v))) {
      passed++;
    }
  });
  return checked === passed? color: false;
}

export function isValidHex(hex) {
  return new tinyColor(hex).isValidHex();
}