import React from 'react';
import { Checkbox } from 'zent';

import './checkbox.scss';

export default class CLSCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text, checked, handleChange } = this.props;
        return <Checkbox checked={checked}
            className="cls-checkbox-style"
            onChange={(e) => {
                handleChange(e.target.checked)
            }}>
            {text}
        </Checkbox>
    }
}