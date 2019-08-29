import { DatePickers } from '../../../_packages_/components/datePicker/common/types';
import {
    getMonthData,
    getRowMonthData,
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
 *
 * @param year
 * @param month
 * @param isDisplayWE is display weekend
 */
export function getMonthLayoutRows(
    year: number,
    month: number,
    isDisplayWE: boolean
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
    weeks = weeks.filter((week, index) => isKeepRow(rows[index]));
    rows = rows.filter(row => isKeepRow(row));

    return {
        rows,
        weeks,
    };
}
