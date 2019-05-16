import React from 'react';
import PropTypes from 'prop-types';

class EditInput extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
  }

  static defaultProps = {
    prefix: 'bxu'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: String.prototype.toUpperCase.apply(this.props.value)
    };
  }



  render() {
    const { 
      prefix, 
      placeholder,
      label
    } = this.props;
    const { value } = this.state;
    
    return (
      <div className={`${prefix}-editinput-container`} >
        <input
          type="text"
          value={value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={placeholder}/>
        {label & (
          <span className={`${prefix}-editinput_label`}>{label}</span>
        )}
      </div>
    );
  }
}

export default EditInput;