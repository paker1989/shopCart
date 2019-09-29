import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import SimpleDateGrid from '../SimpleDateGrid';
import DatePickerHeader from '../DatePickerHeader';
import { DatePickers } from '../../common/types';
import {
    isSameDay,
    populateDisplay,
    getSiblingMonthData,
} from '../../common/util';

import './DatePickerPanel.scss';

class DatePickerPanel extends React.Component<
    DatePickers.IDatePickerPanelProps,
    DatePickers.IDatePickerPanelStates
> {
    static defaultProps = {
        isPopover: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { selectedDate, presentOnly } = nextProps;
        const { displayMonth, displayYear } = prevState;

        if (!selectedDate || presentOnly) {
            return null;
        }
        if (
            selectedDate.getMonth() + 1 !== displayMonth ||
            selectedDate.getFullYear() !== displayYear
        ) {
            return { ...populateDisplay(selectedDate) };
        }
        return null;
    }

    constructor(props) {
        super(props);
        const {
            presentOnly,
            displayYear,
            displayMonth,
            monthData,
        } = this.props;
        if (presentOnly) {
            if (monthData === undefined) {
                throw new Error('monthData is required if presentOnly is true');
            }
            this.state = {
                displayYear,
                displayMonth,
                monthData,
            };
        } else {
            this.state = { ...populateDisplay(new Date()) };
        }
    }

    handleDateClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        const { presentOnly, onClick } = this.props;
        // if presentOnly is false, then do automatic toggle
        if (!presentOnly && !onClick) {
            const { displayMonth, displayYear } = this.state;
            const selectedMonth = selectedDate.getMonth() + 1;
            const selectedYear = selectedDate.getFullYear();

            if (
                selectedMonth !== displayMonth ||
                selectedYear !== displayYear
            ) {
                this.setState({ ...populateDisplay(selectedDate) });
            }
        }

        onClick && onClick(selectedDate, evt);
    };

    handleMonthChange = (actionType: DatePickers.EMonthChangeType): void => {
        const { toSiblingMonth } = this.props;
        const { displayYear, displayMonth } = this.state;

        if (typeof toSiblingMonth === 'function') {
            toSiblingMonth(actionType);
        } else {
            this.setState({
                ...getSiblingMonthData(displayYear, displayMonth, actionType),
            });
        }
    };

    render() {
        let DateDisplayHeader;
        const {
            prefix,
            selectedDate,
            className,
            isPopover,
            customizedHeader,
            presentOnly,
            displayWeeks,
            onDbClick,
        } = this.props;
        const { monthData, displayMonth, displayYear } = this.state;

        const pickerPanelContainerCx = cx(
            {
                [`${prefix}-pickerpanel-container`]: true,
                ['is-popover']: isPopover,
            },
            className
        );

        if (customizedHeader) {
            DateDisplayHeader = customizedHeader;
        } else {
            DateDisplayHeader = (
                <DatePickerHeader
                    displayMonth={displayMonth}
                    displayYear={displayYear}
                    prefix={prefix}
                    handleMonthChange={this.handleMonthChange}
                />
            );
        }

        const dayNames = [
            <FormattedMessage id="comp.short.sun" />,
            <FormattedMessage id="comp.short.mon" />,
            <FormattedMessage id="comp.short.tues" />,
            <FormattedMessage id="comp.short.wedn" />,
            <FormattedMessage id="comp.short.thu" />,
            <FormattedMessage id="comp.short.fri" />,
            <FormattedMessage id="comp.short.sat" />,
        ];

        return (
            <div className={pickerPanelContainerCx}>
                {DateDisplayHeader}
                <div className="calendar-body">
                    <ul className="mondata-row-wrapper">
                        <li>
                            <div className="row-data-container is-header">
                                {displayWeeks && (
                                    <div className="row-data-container--week"></div>
                                )}
                                <div className="row-data-container--main">
                                    {dayNames.map((dayName, index) => (
                                        <SimpleDateGrid
                                            key={`dayname-grid-${index}`}
                                            showValue={dayName}
                                            value={dayName}
                                            isDisable={true}
                                            className="dayname"
                                        />
                                    ))}
                                </div>
                            </div>
                        </li>
                        {monthData.rows.map(
                            (row: DatePickers.IMonthDataFormat[], index) => {
                                return (
                                    <li
                                        className="row-data-container"
                                        key={`monDateRow-${index}`}
                                    >
                                        {displayWeeks && (
                                            <div className="row-data-container--week">
                                                {monthData.weeks[index]}
                                            </div>
                                        )}
                                        <div className="row-data-container--main">
                                            {row.map((day, index) => {
                                                const isToday: boolean = isSameDay(
                                                    day,
                                                    new Date()
                                                );
                                                const isGrey: boolean =
                                                    day.yearD !== displayYear ||
                                                    day.monthD !== displayMonth;
                                                const isSelected: boolean = isSameDay(
                                                    day,
                                                    selectedDate
                                                );
                                                const gridDate: Date = new Date(
                                                    day.yearD,
                                                    day.monthD - 1,
                                                    day.showDate
                                                );

                                                return (
                                                    <SimpleDateGrid
                                                        key={`day-grid-${index}`}
                                                        showValue={day.showDate}
                                                        value={gridDate}
                                                        isToday={
                                                            presentOnly
                                                                ? isToday &&
                                                                  !isGrey
                                                                : isToday
                                                        } // if presentonly, then only display the one in the same month
                                                        isGrey={isGrey}
                                                        isSelected={isSelected}
                                                        onClick={
                                                            this.handleDateClick
                                                        }
                                                        onDbClick={onDbClick}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default DatePickerPanel;
