import * as React from 'react';
import cx from 'classnames';

import { CalendarNS } from '../../../../../utils/types';
import './header.scss';
import { isSameDay } from '../../../../../../../_packages_/components/datePicker/common/util';

export default class DefaultHeader extends React.Component<
    CalendarNS.ISingleDayDefaultHeaderProps,
    any
> {
    static defaultProps = {
        textAlign: 'left',
    };

    render() {
        const { textAlign, cnCalendarNb, date, dayAt, onClick } = this.props;

        const isToday = isSameDay(date, new Date());

        const wrapperClass = cx({
            ['singleDayCol-defaultHeader-container']: true,
            [`is-${textAlign}`]: true,
        });

        const dateContentClass = cx({
            ['singleDayCol-defaultHeader-container__dateContent']: true,
            [`is-clickable`]: typeof onClick === 'function',
            ['is-today']: isToday,
        });

        const calendarNbClass = cx({
            ['singleDayCol-defaultHeader-container__cnCalendarNb']: true,
            ['is-lighter-grey']: !isToday,
        });

        const dateContent = (
            <div
                className={dateContentClass}
                onClick={() => {
                    onClick && onClick(date);
                }}
            >
                {date && (
                    <span className="singleDayCol-defaultHeader-container__dateNumber">
                        {date.getDate()}
                    </span>
                )}
                {cnCalendarNb && (
                    <span className={calendarNbClass}>{cnCalendarNb}</span>
                )}
            </div>
        );

        return (
            <div className={wrapperClass}>
                <div className="singleDayCol-defaultHeader-container__wrapper">
                    {dayAt && (
                        <span className="singleDayCol-defaultHeader-container__dayAt font-subtitle">
                            {dayAt}
                        </span>
                    )}
                    {dateContent}
                </div>
            </div>
        );
    }
}
