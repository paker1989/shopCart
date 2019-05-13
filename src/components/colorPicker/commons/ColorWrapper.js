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
      // this.setState
    }

    render() {
      return (
        <Picker {...this.state} {...this.props} />
      );
    }
  }

  return ColoredPicker;
}