import { FormattedDate } from 'react-intl';
import { DatePickers } from './types';
import * as React from 'react';

// import dateFormat from 'dateformat';

export const _supported_date_format = {
    default: 'YYYY-MM-DD',
};

export function isSameDay(
    selectedDay: DatePickers.IMonthDataFormat | Date,
    targetDay: Date
): boolean {
    if (targetDay === null || targetDay === undefined) {
        return false;
    }

    let monthD;
    let yearD;
    let showDate;

    if (selectedDay instanceof Date) {
        monthD = selectedDay.getMonth() + 1;
        yearD = selectedDay.getFullYear();
        showDate = selectedDay.getDate();
    } else {
        monthD = selectedDay.monthD;
        yearD = selectedDay.yearD;
        showDate = selectedDay.showDate;
    }

    const targetMonth = targetDay.getMonth() + 1;
    const targetYear = targetDay.getFullYear();
    const targetShowDate = targetDay.getDate();

    return (
        monthD === targetMonth &&
        yearD === targetYear &&
        showDate === targetShowDate
    );
}

export function getMonthData(
    year: number,
    month: number
): DatePickers.IMonthDataFormat[] {
    // 本月第一天
    var firstDayOfCurrentMonth = new Date(year, month - 1, 1);
    var firstDayC = firstDayOfCurrentMonth.getDay();
    //本月最后一天
    var lastDayOfCurrentMonth = new Date(year, month, 0);
    var lastDateC = lastDayOfCurrentMonth.getDate();
    var lastDayOfPrevMonth = new Date(year, month - 1, 0);
    var lastDateP = lastDayOfPrevMonth.getDate();
    var currentMonthData: DatePickers.IMonthDataFormat[] = [];
    var yearD: number;
    var monthD: number;
    var showDate: number;
    for (var i = 0; i < 6 * 7; i++) {
        monthD = month;
        if (i < firstDayC) {
            monthD = month - 1;
            showDate = lastDateP - firstDayC + (i + 1);
        } else if (i < firstDayC + lastDateC) {
            monthD = month;
            showDate = i + 1 - firstDayC;
        } else {
            monthD = month + 1;
            showDate = i + 1 - (firstDayC + lastDateC);
        }
        if (monthD < 1) {
            yearD = year - 1;
            monthD += 12;
        } else if (monthD > 12) {
            yearD = year + 1;
            monthD -= 12;
        } else {
            yearD = year;
        }
        currentMonthData.push({
            yearD: yearD,
            monthD: monthD,
            showDate: showDate,
        });
    }

    return currentMonthData;
}

export function getRowMonthData(
    monthData: DatePickers.IMonthDataFormat[],
    nbPerRow = 7
): DatePickers.IMonthDataFormat[][] {
    const nbRows = monthData.length / nbPerRow;
    const monthDataPerRow = new Array(nbRows);

    for (let rowIndex = 0; rowIndex < nbRows; rowIndex++) {
        monthDataPerRow[rowIndex] = monthData.slice(
            rowIndex * nbPerRow,
            rowIndex * nbPerRow + nbPerRow
        );
    }
    return monthDataPerRow;
}

export function populateDisplay(
    date: Date
): DatePickers.IDatePickerPanelStates {
    const displayYear: number = date.getFullYear();
    const displayMonth: number = date.getMonth() + 1;

    const monthData: DatePickers.IMonthDataRowFormat = getMonthLayoutRows(
        displayYear,
        displayMonth,
        true,
        true
    );
    return { displayYear, displayMonth, monthData };
}

export function getSiblingMonthData(
    displayYear: number,
    displayMonth: number,
    actionType: DatePickers.EMonthChangeType
): DatePickers.IDatePickerPanelStates {
    let newDisplayMonth;
    let newDisplayYear;
    let monthData: DatePickers.IMonthDataRowFormat;

    switch (actionType) {
        case DatePickers.EMonthChangeType._next_:
            const isNewYear = displayMonth + 1 > 12;
            newDisplayMonth = isNewYear ? 1 : displayMonth + 1;
            newDisplayYear = isNewYear ? displayYear + 1 : displayYear;

            monthData = getMonthLayoutRows(
                newDisplayYear,
                newDisplayMonth,
                true,
                true
            );
            break;
        case DatePickers.EMonthChangeType._prev_:
            const isPrevYear = displayMonth - 1 <= 0;
            newDisplayMonth = isPrevYear ? 12 : displayMonth - 1;
            newDisplayYear = isPrevYear ? displayYear - 1 : displayYear;

            monthData = getMonthLayoutRows(
                newDisplayYear,
                newDisplayMonth,
                true,
                true
            );
            break;
    }
    return {
        displayYear: newDisplayYear,
        displayMonth: newDisplayMonth,
        monthData,
    };
}

export function getFormattedDate(date: Date, format = 'default'): any {
    if (!date) {
        return '';
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let _format = format || 'default';

    if (format === 'default') {
        _format = _supported_date_format.default;
    }

    switch (_format) {
        case _supported_date_format.default:
            return `${year}-${month}-${day}`;
        case 'YYYY/MM/DD':
            return `${year}/${month}/${day}`;
        case 'literal':
            return (
                <FormattedDate
                    value={date}
                    year="numeric"
                    month="long"
                    day="2-digit"
                />
            );
    }

    return '';
}

/**
 *
 * @param year
 * @param month
 * @param isDisplayWE is display weekend
 * @param includeAllRow if no, then filter only a row contains at least one day of the target month
 */
export function getMonthLayoutRows(
    year: number,
    month: number,
    isDisplayWE: boolean,
    includeAllRow = false
): DatePickers.IMonthDataRowFormat {
    function isKeepRow(row) {
        return (
            row.findIndex(
                item => item.yearD === year && item.monthD === month
            ) !== -1
        );
    }

    const rawMonthData = getMonthData(year, month);
    let rows: DatePickers.IMonthDataFormat[][] = getRowMonthData(rawMonthData);
    let weeks: number[] = rows.map(row => getWeekOfRow(row));

    if (!isDisplayWE) {
        const filteredMonthData = rawMonthData.filter(
            (data, index) => index % 7 !== 0 && index % 7 !== 6
        );
        rows = getRowMonthData(filteredMonthData, 5);
    }

    // drop rows which does not contain any date in target month
    if (!includeAllRow) {
        weeks = weeks.filter((week, index) => isKeepRow(rows[index]));
        rows = rows.filter(row => isKeepRow(row));
    }

    return {
        rows,
        weeks,
    };
}

/**
 * @return the week of given date
 * @param date
 */
export function getWeekOfRow(row: DatePickers.IMonthDataFormat[]): number {
    const rowMaxDate = row[row.length - 1]; // 以最大日期来算;

    const date = new Date(
        rowMaxDate.yearD,
        rowMaxDate.monthD - 1,
        rowMaxDate.showDate
    );

    return getWeekOfDay(date);
}

export function getWeekOfDay(rawDate: Date): number {
    const diff = 6 - rawDate.getDay();
    const date = new Date(
        rawDate.getFullYear(),
        rawDate.getMonth(),
        rawDate.getDate() + diff,
        0,
        0,
        0
    );

    const dateOfDayone = new Date(date.getFullYear(), 0, 1);
    const dayOfDayone = dateOfDayone.getDay() === 0 ? 7 : dateOfDayone.getDay();

    let dayOfGivenDate = date.getDay() === 0 ? 7 : date.getDay();

    let totalDaysOfNow =
        (date.getTime() - dateOfDayone.getTime()) / (24 * 60 * 60 * 1000);

    return Math.ceil((totalDaysOfNow + dayOfDayone - dayOfGivenDate) / 7) + 1;
}
