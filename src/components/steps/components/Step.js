import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import '../step.scss';

class Step extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    prefix: PropTypes.string,
    sequence: PropTypes.bool,
    stepNumber: PropTypes.number,
    status: PropTypes.string,
    isCurrentstep: PropTypes.bool,
    stepLast: PropTypes.bool,
    className: PropTypes.string
  }

  render() {
    const {
      title,
      description,
      isCurrentstep,
      sequence,
      stepNumber,
      prefix,
      stepLast,
      status,
      className
    } = this.props;

    let iconNode;

    if (status === 'finish') {
      iconNode = (<i className={`${prefix}-finish-circle`}/>);
    } else if (status === 'error') {
      iconNode = (<i className={`${prefix}-error-circle`}/>)
    } else {
      iconNode = (
        <span className={`${prefix}-icon`}>{sequence ? stepNumber : ''}</span>
      );
    }

    const classWrapper = cx({
      [`${prefix}-step-wrapper`]: true,
      [`${prefix}-steps-status-${status}`]: true,
      [`${prefix}-step_current`]: isCurrentstep,
    },className);

    return (
      <div className={classWrapper}>
        {!stepLast && (
          <div className={`${prefix}-steps-tail`}>
            <i />
          </div>
        )}
        <div className={`${prefix}-step`}>
          <div className={`${prefix}-step-head`}>
            <div className={`${prefix}-step-head-inner`}>{iconNode}</div>
          </div>
          <div className={`${prefix}-step-main`}>
            <div className={`${prefix}-step-title`}>{title}</div>
            {description && (
              <div className={`${prefix}-step-description`}>{description}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Step;