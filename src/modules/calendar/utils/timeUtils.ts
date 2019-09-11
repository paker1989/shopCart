import { DatePickers } from '../../../_packages_/components/datePicker/common/types';
import {
    getMonthData,
    getRowMonthData,
    getMonthLayoutRows
} from '../../../_packages_/components/datePicker/common/util';

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

    const dateOfDayone = new Date(date.getFullYear(), 0, 1);
    const dayOfDayone = dateOfDayone.getDay() === 0 ? 7 : dateOfDayone.getDay();

    let dayOfGivenDate = date.getDay() === 0 ? 7 : date.getDay();

    let totalDaysOfNow =
        (date.getTime() - dateOfDayone.getTime()) / (24 * 60 * 60 * 1000);
    return Math.ceil((totalDaysOfNow + dayOfDayone - dayOfGivenDate) / 7) + 1;
}

/**
 * @returns the monthData array of target year
 * @param year
 */
export function getMonthDataOfYear(
    year: number
): DatePickers.IMonthDataRowFormat[] {
    const nbOfMonth = 12;
    const monthDataOfYear: DatePickers.IMonthDataRowFormat[] = new Array();
    for (let i = 0; i < nbOfMonth; i++) {
        monthDataOfYear.push(getMonthLayoutRows(year, i + 1, true, true));
    }
    return monthDataOfYear;
}

export function getDayRangeOfWeek(
    year: number,
    week: number,
    displayWE: boolean
): Date[] {
    const datesOfWeek = [];
    const date = new Date(year, 0, 1); // first day of the year;
    const offset = displayWE ? 0 : 1;
    const length = displayWE ? 7 : 5;

    date.setDate(date.getDate() + (week - 1) * 7 - date.getDay() + offset);
    datesOfWeek.push(new Date(date));
    for (let i = 0; i < length - 1; i++) {
        date.setDate(date.getDate() + 1);
        datesOfWeek.push(new Date(date));
    }
    return datesOfWeek;
}
