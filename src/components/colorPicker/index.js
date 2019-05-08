import React from 'react';
import PropTypes from 'prop-types';

import SketchPresetColor from './SketchPresetColor';
import ColorBoard from './ColorBoard';

class ColorPicker extends React.PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.className,
    type: PropTypes.oneOf(['simple', 'colorBoard']),
  }

  static defaultProps = {
    type: 'colorBoard',
    prefix: 'bxu'
  }

  static ColorBoard = ColorBoard;

  render() {
    const {
      prefix,
      type
    } = this.props;

    if (type === 'simple') {
      return (
        <SketchPresetColor>
        </SketchPresetColor>
      );
    } else {
      return (
        <ColorBoard>
        </ColorBoard>
      );
    }
  }
}

export default ColorPicker;