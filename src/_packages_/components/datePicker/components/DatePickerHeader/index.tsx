import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import CalTooltip from '../../../calTooltip';
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
                                Number(displayMonth) - 1,
                                1
                            )
                        }
                        year="numeric"
                        month="long"
                    />
                </div>
                <div className={`${prefix}-header-action`}>
                    <CalTooltip
                        content={<FormattedMessage id="cal.prevmonth" />}
                    >
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
                    </CalTooltip>
                    <CalTooltip
                        content={<FormattedMessage id="cal.nextmonth" />}
                    >
                        <div
                            className="action-span"
                            onClick={() =>
                                handleMonthChange(
                                    DatePickers.EMonthChangeType._next_
                                )
                            }
                        >
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-right"></use>
                            </svg>
                        </div>
                    </CalTooltip>
                </div>
            </div>
        );
    }
}
