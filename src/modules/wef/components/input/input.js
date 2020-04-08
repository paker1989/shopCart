import React from 'react';
import { Input } from 'zent';

import cx from 'classnames';


import './input.scss';

export default class CLSInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            type,
            placeholder,
            value,
            name,
            errorMsg,
            errorIndex,
            onValueChange
        } = this.props;

        const displayError = errorIndex !== undefined && errorIndex !== -1;

        const inputClass = cx({
            ['cls-input-style']: true,
            ['is-error']: displayError
        });

        if (type === 'text') {
            return (
                <React.Fragment>
                    <Input
                        placeholder={placeholder}
                        type={type}
                        className={inputClass}
                        value={value}
                        onChange={(e) => {
                            onValueChange(name, e.target.value)
                        }}
                    />
                    {displayError && <span className="form-errormsg">{errorMsg[errorIndex]}</span>}
                </React.Fragment>
            );
        } else {
            return <Input placeholder={placeholder} type={type} className="cls-text-area-style"
                maxLength="400"
                value={value}
                onChange={(e) => {
                    onValueChange(name, e.target.value)
                }} />
        }

    }
}