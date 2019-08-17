import React, { Children } from 'react';
import cx from 'classnames';

class BreadcrumbSteps extends React.PureComponent {


  render() {
    const {
      children,
      type,
      prefix,
      onStepChange,
      current,
      className
    } = this.props;

    const isBreadcumb = type === 'breadcrumb',
          isCard = type === 'card',
          chilrenNb = Children.count(children),

          stepWidthStyle = {width: `${Math.round(100 / chilrenNb)}%`};
    
    const wrapperClass=cx({
      [`${prefix}-steps-wrapper`]: true,
      [`${prefix}-steps-breadcrumb`]: isBreadcumb,
      [`${prefix}-steps-card`]: isCard,
    }, className);

    return (
      <div className={wrapperClass}>
        {
          Children.map(children, (child, index) => {
            const title = child.props.title,
                  stepClass=cx({
              [`${prefix}-step`]: true,
              [`${prefix}-step-finish`]: index < current,
              [`${prefix}-step-last`]: index == chilrenNb - 1,
            })
            return (
              <div className={stepClass} style={stepWidthStyle} onClick={() => onStepChange(index+1)}>
                {`${index + 1}. ${title}`}
              </div>);
          })
        }
      </div>
    );
  }
}

export default BreadcrumbSteps;