import * as React from 'react';
// import cx from 'classnames';
import { DatePickers } from '../../common/types';

import './DatePickerHeader.scss';

export interface IDatePickerHeaderProps {
    prefix?: string;
    displayYear: string | number;
    displayMonth: string | number;
    handleMonthChange?: DatePickers.FnMonthChange;
}

export default class DatePickerHeader extends React.PureComponent
    <IDatePickerHeaderProps, any> {

    static defaultProps = {
        prefix: 'bxu'
    }

    render() {
        const { prefix, displayMonth, displayYear, handleMonthChange } = this.props;
        return (
            <div className={`${prefix}-datepicker-header`}>
                <div className={`${prefix}-header-title`}>
                    {`${displayYear}年${displayMonth}月`}
                </div>
                <div className={`${prefix}-header-action`}>
                    <div className="action-span"
                        onClick={() => handleMonthChange(DatePickers.monthChangeType._prev_)}>
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-left"></use>
                        </svg>
                    </div>
                    <div className="action-span"
                        onClick={() => handleMonthChange(DatePickers.monthChangeType._next_)}>
                        {/* <span>{`>`}</span> */}
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}