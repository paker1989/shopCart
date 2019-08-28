import * as React from "react";

import cx from "classnames";
import SimpleDateGrid from "../SimpleDateGrid";
import DatePickerHeader from "../DatePickerHeader";

import "./DatePickerPanel.scss";

import { DatePickers, dayNames } from "../../common/types";
import {
    isSameDay,
    populateDisplay,
    getSiblingMonthData,
    getRowMonthData
} from "../../common/util";

class DatePickerPanel extends React.Component<
    DatePickers.IDatePickerPanelProps,
    DatePickers.IDatePickerPanelStates
    > {
    static defaultProps = {
        isPopover: false
    };

    constructor(props) {
        super(props);
        const { displayYear, displayMonth, monthData } = populateDisplay(
            new Date()
        );
        this.state = {
            displayYear,
            displayMonth,
            monthData
        };
    }

    handleDateSelect = (selectedDate: Date): void => {
        const { displayMonth, displayYear } = this.state;
        const { onChange } = this.props;
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedYear = selectedDate.getFullYear();

        if (selectedMonth !== displayMonth || selectedYear !== displayYear) {
            const { displayYear, displayMonth, monthData } = populateDisplay(
                selectedDate
            );

            this.setState({
                displayYear,
                displayMonth,
                monthData
            });
        }

        onChange && onChange(selectedDate);
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
            monthData: updatedStateData.monthData
        });
    };

    render() {
        const { prefix, selectedDate, className, isPopover } = this.props;

        const { monthData, displayMonth, displayYear } = this.state;

        // const nbRows = monthData.length / 7;
        // let monthDataPerRow = new Array(nbRows);
        // for (let rowIndex = 0; rowIndex < nbRows; rowIndex++) {
        //     monthDataPerRow[rowIndex] = monthData.slice(
        //         rowIndex * 7,
        //         rowIndex * 7 + 7
        //     );
        // }
        const monthDataPerRow: DatePickers.IMonthDataFormat[][] = getRowMonthData(monthData);

        const pickerPanelContainerCx = cx(
            {
                [`${prefix}-pickerpanel-container`]: true,
                ["is-popover"]: isPopover
            },
            className
        );

        return (
            <div className={pickerPanelContainerCx}>
                <DatePickerHeader
                    displayMonth={displayMonth}
                    displayYear={displayYear}
                    prefix={prefix}
                    handleMonthChange={this.handleMonthChange}
                />
                <div className="calendar-body">
                    <ul className="mondata-row-wrapper">
                        <li>
                            <div className="row-data-container">
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
                        </li>
                        {monthDataPerRow.map(
                            (row: DatePickers.IMonthDataFormat[], index) => (
                                <li key={`monDateRow-${index}`}>
                                    <div className="row-data-container">
                                        {row.map((day, index) => {
                                            const isToday: boolean = isSameDay(day, new Date());
                                            const isGrey: boolean =
                                                day.yearD !== displayYear ||
                                                day.monthD !== displayMonth;
                                            const isSelected: boolean = isSameDay(day, selectedDate);
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
                                                    isToday={isToday}
                                                    isGrey={isGrey}
                                                    isSelected={isSelected}
                                                    onSelect={this.handleDateSelect}
                                                />
                                            );
                                        })}
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default DatePickerPanel;
