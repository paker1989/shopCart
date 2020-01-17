import React from 'react';
import { Select } from 'zent';


// import 'zent/css/index.css';
import './select.scss';

export default class CLSSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { placeholder, data } = this.props;
        return <Select data={data} optionValue="name"
            optionText="name" placeholder={placeholder}
            className="cls-select-style"
            popupClassName="cls-select-popstyle"
            width="100%"
            autoWidth="true"
        />
    }
}