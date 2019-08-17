import React from 'react';

import cx from 'classnames';

class NumberSteps extends React.PureComponent {

  render() {
    const {
      className,
      children,
      sequence,
      direction,
      status,
      current,
      prefix
    } = this.props;
    
    const lastIndex = React.Children.count(children) - 1;
    const cls = cx({
      [`${prefix}-steps-wrapper`]: true,
      [`${prefix}-steps-${direction}`]: true,
    }, className);

    return (
      <div className={cls}>
        {React.Children.map(children, (child, index) => {
           const np = {
             sequence,
             status,
             prefix,
             isCurrentstep: index === current - 1,
             stepNumber: index+1,
             stepLast: index === lastIndex     
           };
           if (index >= current) {
             np.status = 'wait';
           } else if (index < current - 1) {
             np.status = 'finish';
           }
           return React.cloneElement(child, np);
         })}
      </div>
    );
  }
}

export default NumberSteps;