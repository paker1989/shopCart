import * as React from 'react';

import cx from 'classnames';
import SimpleDateGrid from '../SimpleDateGrid';
import DatePickerHeader from '../DatePickerHeader';

import './DatePickerPanel.scss';

import { DatePickers, dayNames } from '../../common/types';
import { getMonthData, isSameDay } from '../../common/util';

class DatePickerPanel extends React.Component
    <DatePickers.IDatePickerPanelProps, DatePickers.IDatePickerPanelStates> {

    static defaultProps = {
        isPopover: false
    }

    static populateDisplay(date: Date): DatePickers.IDatePickerPanelStates {
        const displayYear: number = date.getFullYear();
        const displayMonth: number = date.getMonth() + 1;
        const monthData: DatePickers.IMonthDataFormat[] = getMonthData(displayYear, displayMonth);

        return { displayYear, displayMonth, monthData };
    }

    constructor(props) {
        super(props);
        const { displayYear, displayMonth, monthData } = DatePickerPanel.populateDisplay(new Date());
        this.state = {
            displayYear,
            displayMonth,
            monthData,
        };
    }

    handleMonthChange = (actionType: DatePickers.monthChangeType): void => {
        switch (actionType) {
            case DatePickers.monthChangeType._next_:
                break;
            case DatePickers.monthChangeType._prev_:
                break;
        }
    }

    render() {
        const {
            prefix,
            selectedDate,
            className,
            isPopover
        } = this.props;

        const { monthData, displayMonth, displayYear } = this.state;

        const nbRows = monthData.length / 7;
        let monthDataPerRow = new Array(nbRows);
        for (let rowIndex = 0; rowIndex < nbRows; rowIndex++) {
            monthDataPerRow[rowIndex] = monthData.slice(rowIndex * 7, rowIndex * 7 + 7);
        }

        const pickerPanelContainerCx = cx({
            [`${prefix}-pickerpanel-container`]: true,
            ['is-popover']: isPopover
        }, className);

        return (
            <div className={pickerPanelContainerCx}>
                <DatePickerHeader
                    displayMonth={displayMonth}
                    displayYear={displayYear}
                    prefix={prefix}
                    handleMonthChange={this.handleMonthChange}
                />
                <div className='calendar-body'>
                    <ul className="mondata-row-wrapper">
                        <li>
                            <div className="row-data-container">
                                {
                                    dayNames.map((dayName, index) => (
                                        <SimpleDateGrid
                                            key={`dayname-grid-${index}`}
                                            value={dayName}
                                            isDisable={true}
                                            className="dayname"
                                        />
                                    ))
                                }
                            </div>
                        </li>
                        {
                            monthDataPerRow.map((row: DatePickers.IMonthDataFormat[], index) => (
                                <li key={`monDateRow-${index}`}>
                                    <div className="row-data-container">
                                        {row.map((day, index) => {
                                            const isToday: boolean = isSameDay(day, new Date());
                                            const isGrey: boolean = day.yearD !== displayYear
                                                || day.monthD !== displayMonth;
                                            const isSelected: boolean = isSameDay(day, selectedDate);

                                            return (
                                                <SimpleDateGrid
                                                    key={`day-grid-${index}`}
                                                    value={day.showDate}
                                                    isToday={isToday}
                                                    isGrey={isGrey}
                                                    isSelected={isSelected} />
                                            )
                                        })
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default DatePickerPanel;