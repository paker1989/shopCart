import * as React from 'react';
import { FormattedDate } from 'react-intl';

import { DatePickers } from '../../common/types';

import './DatePickerHeader.scss';

export interface IDatePickerHeaderProps {
    prefix?: string;
    displayYear: string | number;
    displayMonth: string | number;
    handleMonthChange?: DatePickers.FnMonthChange;
}

export default class DatePickerHeader extends React.PureComponent<
    IDatePickerHeaderProps,
    any
> {
    static defaultProps = {
        prefix: 'bxu',
    };

    render() {
        const {
            prefix,
            displayMonth,
            displayYear,
            handleMonthChange,
        } = this.props;
        return (
            <div className={`${prefix}-datepicker-header`}>
                <div className={`${prefix}-header-title`}>
                    <FormattedDate
                        value={
                            new Date(
                                Number(displayYear),
                                Number(displayMonth)-1,
                                1
                            )
                        }
                        year="numeric"
                        month="long"
                    />
                </div>
                <div className={`${prefix}-header-action`}>
                    <div
                        className="action-span"
                        onClick={() =>
                            handleMonthChange(
                                DatePickers.EMonthChangeType._prev_
                            )
                        }
                    >
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-left"></use>
                        </svg>
                    </div>
                    <div
                        className="action-span"
                        onClick={() =>
                            handleMonthChange(
                                DatePickers.EMonthChangeType._next_
                            )
                        }
                    >
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
