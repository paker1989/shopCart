import * as React from 'react';
import cx from 'classnames';

import './checkbox.scss';

export interface ICheckboxProps {
    checked?: boolean;
    className?: string;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class Checkbox extends React.PureComponent<ICheckboxProps, any> {
    static defaultProps = {
        checked: false,
        readOnly: false,
        disabled: false,
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        e.stopPropagation();
        onChange && onChange(e);
    };

    render() {
        const {
            checked,
            className,
            readOnly,
            disabled,
            children,
        } = this.props;

        const wrapperClass = cx(
            {
                ['input-checkbox-wrapper']: true,
                ['is-checked']: checked,
                ['is-readonly']: readOnly,
                ['is-disabled']: disabled,
            },
            className
        );
        return (
            <div className={wrapperClass}>
                <span className="input-checkbox-inner" />
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={this.handleChange}
                />
                {children !== undefined ? (
                    <span className="input-checkbox-inner--label">
                        {children}
                    </span>
                ) : null}
            </div>
        );
    }
}

export default Checkbox;
