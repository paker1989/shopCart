import React from 'react';
import PropTypes from 'prop-types';

import isValidNumber from '../../../utils/isValidNumber';

class EditInput extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    value: function(props, propName) {
      const value = props[propName];
      if ((props.scale !== undefined || props.minValue !== undefined || props.maxValue !== undefined) 
        && (isNaN(value))) {
        throw new Error('The value should be a number if one of scale,' + 
        'minValue or maxValue prop is presented');
      }
    },
    scale: function(props, propName) {
      const value = props[propName];
      if (value && (!Number(value) || isNaN(Number(value)) || Number(value) < 1)) {
        return new Error('scale should be a number greater than 1');
      }
    },
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
  }

  static defaultProps = {
    prefix: 'bxu',
  }

  static getDerivedStateFromProps(props, state) {
    let newValue = EditInput.getValueFromProps(props);

    if (newValue != state.value) {
      console.log('update');
      return {
        value: newValue
      }
    }
    return null;
  }

  static getValueFromProps(props) {
    const { scale, value } = props;
    let stateValue = scale? parseInt(scale*value): value;
    return String(stateValue).toUpperCase();
  }
  
  constructor(props) {
    super(props);
    this.state = {
      value: EditInput.getValueFromProps(this.props)
    };
  }

  handleChange =(evt) => {
    const { onChange, label, minValue, maxValue, scale } = this.props;
    let newValue = evt.target.value;
    
    if ((minValue !== undefined || maxValue !== undefined) && !isNaN(newValue)) {
      if (minValue !== undefined && parseInt(newValue) < minValue) {
        newValue = minValue;
      } else if (maxValue !== undefined && parseInt(newValue) > maxValue) {
        newValue = maxValue;
      }
    }

    if (scale &&isValidNumber(newValue)) {
      newValue = Number(newValue)/scale;
    }

    console.log('new value: ' + newValue);

    this.setState({ value: String(newValue).toUpperCase()});
    onChange && onChange(newValue, label);
  }

  render() {
    const { 
      prefix, 
      placeholder,
      label,
      size,
    } = this.props;
    const { value } = this.state;

    let style = {
      flex: `${size === 'single'? 1: 2} 1 0`
    }
    
    return (
      <div className={`${prefix}-editinput-container`} style={style}>
        <input
          type="text"
          value={value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={placeholder}/>
        {label && (
          <span className={`${prefix}-editinput_label`}>{label}</span>
        )}
      </div>
    );
  }
}

export default EditInput;