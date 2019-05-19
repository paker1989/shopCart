import tinyColor from 'tinycolor2';
import isNumber from '../../../utils/isValidNumber';

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
  let checked = 0, 
      passed = 0;

  keysToCheck.forEach((letter) => {
    const v = color[letter];
    if (v !== undefined) {
      checked += 1;
      if (isNumber(v)) {
        passed += 1;
      }
    }
  });
  return checked === passed? color: false;
}

export function isValidHex(hex) {
  return tinyColor(hex).isValid();
}

export const defaultPresetColors = [
  '#FFFFFF',
  '#F8F8F8',
  '#F2F2F2',
  '#999999',
  '#444444',
  '#FF4444',
  '#FF6500',
  '#FF884D',
  '#FFCD00',
  '#3FBD00',
  '#3FBC87',
  '#00CD98',
  '#5197FF',
  '#BADCFF',
  '#FFEFB8',
];