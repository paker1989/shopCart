import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Textarea from './textarea';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';


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
    const { autoFocus } = this.props;
    if (autoFocus) {
      this.input.focus();
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

  render() {
    const {
      type,
      className,
      readOnly,
      disabled,
      onChange,
      prefix,
      addonBefore,
      addonAfter,
      value
    } = this.props;

    const isEditable = !(readOnly || disabled);

    const wrapperClass = cx({
      [`${prefix}-input-wrapper`]: true,
      [`${prefix}-input-wrapper_not-editable`]: !isEditable,
      className
    });

    const inputProps = omit(this.props, [
      'className',
      'prefix',
      'addonBefore',
      'addonAfter',
      'onPressEnter',
      'showCount',
      'showClear',
      'autoSelect',
      'initSelectionStart',
      'initSelectionEnd',
      'width',
    ])

    if (type.toLowerCase() === 'textarea') {
    return (<Textarea className={wrapperClass}/>);
    }

    return (
      <div className={wrapperClass}>
        {addonBefore && (
          <span className={`${prefix}-input-addon-before`}>{addonBefore}</span>
        )}
        <input 
          ref={input => {this.input = input}}
          className={`${prefix}-input`}
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