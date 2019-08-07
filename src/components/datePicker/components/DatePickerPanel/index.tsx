import * as React from 'react';

import SimpleDateGrid from '../SimpleDateGrid';

import './DatePickerPanel.scss';

import DatePickers from '../../common/types';
import { getMonthData, isSameDay } from '../../common/util';

class DatePickerPanel extends React.Component
    <DatePickers.IDatePickerPanelProps, DatePickers.IDatePickerPanelStates> {

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

    render() {
        const {
            prefix,
            selectedDate,
        } = this.props;

        const { monthData, displayMonth, displayYear } = this.state;

        let DatePickerHeader: React.FunctionComponent = () => (
            <div className={`${prefix}-datepicker-header`}>
                <div className={`${prefix}-header-title`}>
                    {`${displayYear}年${displayMonth}月`}
                </div>
                <div className={`${prefix}-header-action`}>
                    <span>{`<`}</span>
                    <span>{`>`}</span>
                </div>
            </div>);

        const nbRows = monthData.length / 7;
        let monthDataPerRow = new Array(nbRows);
        for (let rowIndex = 0; rowIndex < nbRows; rowIndex++) {
            monthDataPerRow[rowIndex] = monthData.slice(rowIndex * 7, rowIndex * 7 + 7);
        }

        return (
            <div className={`${prefix}-pickerpanel-container`}>
                <DatePickerHeader />
                <div className='calendar-body'>
                    <div className="calendar-title-container">
                        {/* todo */}
                    </div>
                    <ul className="mondata-row-wrapper">
                        {
                            monthDataPerRow.map((row: DatePickers.IMonthDataFormat[], index) => (
                                <li key={index}>
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