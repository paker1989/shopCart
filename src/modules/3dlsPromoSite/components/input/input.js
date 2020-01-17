import React from 'react';
import { Input } from 'zent';

import './input.scss';

export default class CLSInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type, placeholder } = this.props;
        if (type === 'text') {
            return <Input placeholder={placeholder} type={type} className="cls-input-style" />;
        } else {
            return <Input placeholder={placeholder} type={type} className="cls-text-area-style" 
            maxLength="400"/>
        }

    }
}