import * as React from 'react';
import cx from 'classnames';

import { CalendarNS } from '../../../../../utils/types';
import './header.scss';

export default class DefaultHeader extends React.Component<
    CalendarNS.ISingleDayDefaultHeaderProps,
    any
> {
    static defaultProps = {
        textAlign: 'left',
    };

    render() {
        const { textAlign, cnCalendarNb, dateNumber, dayAt } = this.props;

        const wrapperClass = cx({
            ['singleDayCol-defaultHeader-container']: true,
            [`is-${textAlign}`]: true,
        });
        return (
            <div className={wrapperClass}>
                <div className="singleDayCol-defaultHeader-container__wrapper">
                    {dayAt && (
                        <span className="singleDayCol-defaultHeader-container__dayAt font-subtitle">
                            {dayAt}
                        </span>
                    )}
                    {dateNumber && (
                        <span className="singleDayCol-defaultHeader-container__dateNumber">
                            {dateNumber}
                        </span>
                    )}
                    {cnCalendarNb && (
                        <span className="singleDayCol-defaultHeader-container__cnCalendarNb is-lighter-gey">
                            {cnCalendarNb}
                        </span>
                    )}
                </div>
            </div>
        );
    }
}
