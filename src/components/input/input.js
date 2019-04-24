import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './input.scss';
import Textarea from './textarea';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import getWidth from '../../utils/getWidth';


class Input extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    onPressEnter: PropTypes.func,
    showCount: PropTypes.bool,
    showClear: PropTypes.bool,
    autoSize: PropTypes.bool,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    initSelectionStart: PropTypes.number,
    initSelectionEnd: PropTypes.number,
    autoSelect: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    disabled: false,
    readOnly: false,
    prefix: 'bxu',
    type: 'text',
    autoFocus: false,
    autoSelect: false,
    showClear: false,
  }

  componentDidMount() {
    const { autoFocus, 
            autoSelect,
            initSelectionStart, 
            initSelectionEnd 
          } = this.props;
    if (autoFocus) {
      this.input.focus();
    }
    if (autoSelect) {
      this.input.setSelectionRange(initSelectionStart, initSelectionEnd);
    }
  }

  clearInput = (e) => {
    const { onChange } = this.props;

    isFunction(onChange) && (
      onChange({
        target: {
          ...this.props,
          value: '',
        },
        preventDefault: e => e.preventDefault(),
        stopPropagation: e => e.stopPropagation(),
        fromClearButton: true
      })
    );
  }

  retainInputFocus = evt => {
    evt.preventDefault();
  };

  handleKeyDown = evt => {
    const keyCode = evt.code || evt.keyCode,
          { onPressEnter, onKeyDown } = this.props;
    if (keyCode && keyCode === 13 && onPressEnter) {
      onPressEnter(evt);
    } else if (onKeyDown) {
      onKeyDown(evt);
    }
  }

  render() {
    const {
      type,
      className,
      readOnly,
      disabled,
      onChange,
      prefix,
      width,
      showClear,
      addonBefore,
      addonAfter,
      value,
    } = this.props;

    const isEditable = !(readOnly || disabled);
    const wrapperClass = cx({
      [`${prefix}-input-wrapper`]: true,
      [`${prefix}-input-wrapper_not-editable`]: !isEditable,
      },
      className
    );
    const wrapperStyle = getWidth(width);
    const inputProps = omit(this.props, [
      'className',
      'width',
      'addonBefore',
      'addonAfter',
      'onPressEnter',
      'showClear',
      'autoSelect',
      'initSelectionStart',
      'initSelectionEnd',
      'width',
    ])

    if (type.toLowerCase() === 'textarea') {
      return (<Textarea className={wrapperClass} 
        wrapperStyle={wrapperStyle}
        handleKeyDown={this.handleKeyDown}
        inputRef={this}
        {...inputProps}/>);
    }

    return (
      <div className={wrapperClass} style={wrapperStyle}>
        {addonBefore && (
          <span className={`${prefix}-input-addon-before`}>{addonBefore}</span>
        )}
        <input 
          ref={input => {this.input = input}}
          className={`${prefix}-input`}
          value={value}
          onKeyDown={this.handleKeyDown}
          {...inputProps}/>
        {isFunction(onChange) && value && showClear && (
           <i
           className={`prefix-input-icon`}
           onClick={this.clearInput}
           onMouseDown={this.retainInputFocus}
           ></i>
        )}
        {addonAfter && (
          <span className={`${prefix}-input-addon-after`}>{addonAfter}</span>
        )}
      </div>
    );
  }
}

export default Input;