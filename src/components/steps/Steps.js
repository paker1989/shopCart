import React from 'react';
import PropTypes from 'prop-types';

import BreadcrumbSteps from './components/BreadcrumbSteps';
import NumberSteps from './components/NumberSteps';
// import cx from 'classnames';
import './step.scss';

class Steps extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string,
    direction: PropTypes.string,
    current: PropTypes.number,
    status: PropTypes.string,
    sequence: PropTypes.bool,
    onStepChange: PropTypes.func,
    className: PropTypes.string,
    prefix: PropTypes.string,
  }

  static defaultProps = {
    type: 'number',
    direction: 'horizontal',
    current: 0,
    status: 'process',
    sequence: true,
    prefix: 'bxu'
  }

  render() {
    const {
      type, children, ...restProps
    } = this.props;

    const StepComponentMapping = {
      breadcrumb: BreadcrumbSteps,
      card: BreadcrumbSteps,
      number: NumberSteps
    };

    const StepComponent = StepComponentMapping[type];

    return (
      <StepComponent type={type} {...restProps}>
        {children}
      </StepComponent>
    );

  }
}

export default Steps;