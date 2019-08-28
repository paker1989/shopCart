import { DatePickers } from '../../../_packages_/components/datePicker/common/types';
import {
    getMonthData,
    getRowMonthData,
} from '../../../_packages_/components/datePicker/common/util';

/**
 * @return the week of given date
 * @param date
 */
export function getWeekOfDate(date: Date): number {
    const dateOfDayone = new Date(date.getFullYear(), 0, 1);
    const dayOfDayone = dateOfDayone.getDay() === 0 ? 7 : dateOfDayone.getDay();

    let dayOfGivenDate = date.getDay() === 0 ? 7 : date.getDay();

    let totalDaysOfNow =
        (date.getTime() - dateOfDayone.getTime()) / (24 * 60 * 60 * 1000);
    return Math.ceil((totalDaysOfNow + dayOfDayone - dayOfGivenDate) / 7) + 1;
}

/**
 *
 * @param year
 * @param month
 * @param isDisplayWE is display weekend
 */
export function getMonthLayoutRows(
    year: number,
    month: number,
    isDisplayWE: boolean
): DatePickers.IMonthDataFormat[][] {
    const rawMonthData = getMonthData(year, month);
    const filteredMonthData = isDisplayWE
        ? rawMonthData
        : rawMonthData.filter(
              (data, index) => index % 7 !== 0 && index % 7 !== 6
          );

    const rows = getRowMonthData(filteredMonthData, isDisplayWE ? 7 : 5);
    const isDropFirstRow =
        rows[0].findIndex(
            item => item.yearD === year && item.monthD === month
        ) === -1;
    const isDropLastRow =
        rows[rows.length - 1].findIndex(
            item => item.yearD === year && item.monthD === month
        ) === -1;

    if (isDropFirstRow) {
        rows.shift();
    }
    if (isDropLastRow) {
        rows.pop();
    }
    return rows;
}
