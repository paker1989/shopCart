import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TextArea extends React.Component {
  
  render() {
    const {
      prefix,
      className,
      wrapperStyle,
      maxLength,
      handleKeyDown,
      inputRef,
      value = '',
      showCount,
      ...others,
    } = this.props;

    if (showCount && !maxLength) {
      throw new Error('you must define maxLength props for showCount');
    }

    let currentCount = value.length;
    const textareaWrapperClass = cx(
      className,
      {[`${prefix}-textarea-wrapper`]: true}
    );

    
    return (
      <div className={textareaWrapperClass} style={wrapperStyle}>
        <textarea type="textarea"
          ref={(textarea) => {
            inputRef.input = textarea;
          }}
          onKeyDown={handleKeyDown}
          {...others} 
        />
        {showCount && (
          <span className={`${prefix}-textarea_showCount`}>
            {currentCount}/{maxLength}
          </span>
        )}
      </div>
    );
  }
}

export default TextArea;