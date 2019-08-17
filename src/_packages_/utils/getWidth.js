import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

export default (width => {
  if (isString(width) || isNumber(width)) {
    return { width: `${width}px`};
  }
  return {};
})