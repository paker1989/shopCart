import React from 'react';
import cx from 'classnames';
import './global.scss';

class Icon extends React.PureComponent {
    render() {
        const { circle, children, className, ...otherProps } = this.props;

        const wrapperClass = cx({
            ['bxu-icon']: true,
            ['is-circle']: circle === true
        }, className);

        if (circle) {
            return (
                <button className={wrapperClass} {...otherProps}>
                    {children}
                </button>
            );
        } else {
            return (
                React.cloneElement(children, {
                    className: cx(children.props.className, wrapperClass),
                    ...otherProps
                })
            )
        }
    }
}

export default Icon;