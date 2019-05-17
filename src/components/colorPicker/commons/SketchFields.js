import React from 'react';

import EditInput from './EditInput';
import { isValidHex, simpleValidColor } from '../helpers/color';

class SketchFileds extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (value, label) => {
    const { onChange, rgb } = this.props;

    switch(label) {
      case 'Hex': 
        if (isValidHex(value)) {
          onChange(value);
        }
        break;
      case 'R':
        if (simpleValidColor(value)) {
          onChange({
            r: value,
            g: rgb.g,
            b: rgb.b,
            a: rgb.a,
            source: 'rgb',
          })
        }
        break;
      case 'G':
        if (simpleValidColor(value)) {
          onChange({
            r: rgb.r,
            g: value,
            b: rgb.b,
            a: rgb.a,
            source: 'rgb',
          })
        }
        break;
      case 'B':
        if (simpleValidColor(value)) {
          onChange({
            r: rgb.r,
            g: rgb.g,
            b: value,
            a: rgb.a,
            source: 'rgb',
          })
        }
        break;
      case 'A':
        if (simpleValidColor(value)) {
          onChange({
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
            a: value,
            source: 'rgb',
          })
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { prefix, rgb, hex } = this.props;
    console.log('new rgb: ' + JSON.stringify(rgb));
    return (
      <div className={`${prefix}-sketchFields-container`}>
        <EditInput
          label="Hex"
          size="double"
          numberValueOnly={false}
          value={hex}
          onChange={this.handleChange}
        />
        <EditInput
          label="R"
          size="single"
          value={rgb.r}
          minValue={0}
          maxValue={255}
          onChange={this.handleChange}
        />
        <EditInput
          label="G"
          size="single"
          value={rgb.g}
          minValue={0}
          maxValue={255}
          onChange={this.handleChange}
        />
        <EditInput
          label="B"
          size="single"
          value={rgb.b}
          minValue={0}
          maxValue={255}
          onChange={this.handleChange}
        />
        <EditInput
          label="A"
          size="single"
          value={rgb.a}
          minValue={0}
          maxValue={100}
          scale={100}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SketchFileds;