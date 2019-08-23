import * as React from 'react';

import { DatePicker } from '../../../../../_packages_/components/datePicker';

import './shelf.scss';

const _test_date_value_ = new Date('2019-08-31');

export default class CalendarBody extends React.Component {
    /**
     * test
     */
    handleOnChange = (newDate: Date): void => {};

    render() {
        return (
            <div className="calbody-shelf-container">
                <div className="calbody-shelf-container__createWrapper">
                    <div
                        role="button"
                        className="btn is-ellipse calbody-shelf-container__createBtn"
                    >
                        <svg
                            className="ali-icon calbody-shelf-container__createIcon"
                            aria-hidden="true"
                        >
                            <use xlinkHref="#icon-create" />
                        </svg>
                        <span className="calbody-shelf-container__createText">
                            创建
                        </span>
                    </div>
                </div>
                <div className="calbody-shelf-container__main">
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
