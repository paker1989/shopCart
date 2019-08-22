import * as React from 'react';

import { DatePicker } from '../../../../_packages_/components/datePicker';

import './calBody.scss';

const _test_date_value_ = new Date('2019-08-31');

export default class CalendarBody extends React.Component {
    /**
     * test
     */
    handleOnChange = (newDate: Date): void => {
    };

    render() {
        return (
            <div className="calbody-container">
                <div className="calbody-container-shelf">
                    <div className="calbody-container-shelf__create" />
                    <div className="calbody-container-shelf__datepicker">
                        <DatePicker
                            value={_test_date_value_}
                            isPopover={false}
                            onChange={this.handleOnChange}
                            format="YYYY/MM/DD"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
