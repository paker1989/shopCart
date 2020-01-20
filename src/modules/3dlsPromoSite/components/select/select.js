import React from 'react';
import { Select } from 'zent';
import cx from 'classnames';


// import 'zent/css/index.css';
import './select.scss';

export default class CLSSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            placeholder,
            data,
            value,
            name,
            errorMsg,
            errorIndex,
            onValueChange
        } = this.props;

        const displayError = errorIndex !== undefined && errorIndex !== -1;

        const selectClass = cx({
            ['cls-select-style']: true,
            ['is-error']: displayError
        });


        return (
            <React.Fragment>
                <Select
                    value={value}
                    data={data}
                    optionValue="name"
                    optionText="name"
                    placeholder={placeholder}
                    className={selectClass}
                    popupClassName="cls-select-popstyle"
                    width="100%"
                    autoWidth="true"
                    onChange={(e) => {
                        onValueChange(name, e.target.value)
                    }}
                />
                {displayError && <span className="form-errormsg">{errorMsg[errorIndex]}</span>}
            </React.Fragment>
        );
    }
}