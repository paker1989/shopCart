import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import SimpleDateGrid from '../SimpleDateGrid';
import DatePickerHeader from '../DatePickerHeader';

import './DatePickerPanel.scss';

import { DatePickers } from '../../common/types';
import {
    isSameDay,
    populateDisplay,
    getSiblingMonthData,
} from '../../common/util';

class DatePickerPanel extends React.Component<
    DatePickers.IDatePickerPanelProps,
    DatePickers.IDatePickerPanelStates
> {
    static defaultProps = {
        isPopover: false,
    };

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
            const { displayYear, displayMonth, monthData } = populateDisplay(
                new Date()
            );
            console.log(displayMonth);
            this.state = {
                displayYear,
                displayMonth,
                monthData,
            };
        }
    }

    handleDateClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        const { presentOnly, onClick } = this.props;
        // if presentOnly is false, then do automatic toggle
        if (!presentOnly) {
            const { displayMonth, displayYear } = this.state;
            const selectedMonth = selectedDate.getMonth() + 1;
            const selectedYear = selectedDate.getFullYear();

            if (
                selectedMonth !== displayMonth ||
                selectedYear !== displayYear
            ) {
                const {
                    displayYear,
                    displayMonth,
                    monthData,
                } = populateDisplay(selectedDate);

                this.setState({
                    displayYear,
                    displayMonth,
                    monthData,
                });
            }
        }

        onClick && onClick(selectedDate, evt);
    };

    handleMonthChange = (actionType: DatePickers.monthChangeType): void => {
        const { displayYear, displayMonth } = this.state;
        const updatedStateData = getSiblingMonthData(
            displayYear,
            displayMonth,
            actionType
        );
        this.setState({
            displayYear: updatedStateData.displayYear,
            displayMonth: updatedStateData.displayMonth,
            monthData: updatedStateData.monthData,
        });
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

        // console.log(monthData);
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
            <FormattedMessage id="comp.short.sun"/>,
            <FormattedMessage id="comp.short.mon"/>,
            <FormattedMessage id="comp.short.tues"/>,    
            <FormattedMessage id="comp.short.wedn"/>,
            <FormattedMessage id="comp.short.thu"/>,
            <FormattedMessage id="comp.short.fri"/>,
            <FormattedMessage id="comp.short.sat"/>,
        ]

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
                                                        onClick={this.handleDateClick}
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
