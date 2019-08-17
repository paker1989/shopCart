import React from 'react';
import { toState } from '../helpers/color';

export default function (Picker) {
  class ColoredPicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ...toState(this.props.color)
      }
    }

    handleColorChange = (color) =>  {
      const { onChange } = this.props;
      let newColor = toState(color);

      this.setState({
        ...newColor
      })
      if (onChange) {
        onChange(newColor);
      }
    }

    render() {
      const { onChange, ...otherProps} = this.props;
      return (
        <Picker {...this.state} {...otherProps} onChange={this.handleColorChange} />
      );
    }
  }

  return ColoredPicker;
}