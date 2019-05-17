import React from 'react';
import PropTypes from 'prop-types';

import isNumber from 'lodash/isNumber';

class EditInput extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    value: function(props, propName) {
      const value = props[propName];
      if ((props.scale || props.minValue || props.maxValue) 
        && (!Number(value) || isNaN(Number(value)))) {
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

  constructor(props) {
    super(props);
    this.state = {
      value: this.getStateFromProps(this.props)
    };
  }

  componentDidUpdate(props) {
    let newValue = this.getStateFromProps(props);
    if (props.label === 'G') {
      console.log('value: ' + props.value + 'newValue = ' + newValue +', oldValue='+this.state.value);
    }
    if (this.state.value != newValue) {
      console.log('did update');
      this.setState({
        value: newValue
      })
    }
  }

  getStateFromProps(props) {
    const { scale, value } = props;
    let stateValue = scale? parseInt(scale*value): value;
    return String(stateValue).toUpperCase();
  }

  handleChange =(evt) => {
    console.log('handle change');
    const { onChange, label, minValue, maxValue, scale } = this.props;
    let newValue = evt.target.value;
    
    if (isNumber(minValue) || isNumber(maxValue) && Number(newValue)) {
      if (minValue && parseInt(newValue) < minValue) {
        newValue = minValue;
      } else if (maxValue && parseInt(newValue) > maxValue) {
        newValue = maxValue;
      }
    }

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