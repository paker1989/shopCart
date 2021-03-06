import { DatePickers } from '../../../_packages_/components/datePicker/common/types';
import {
    getMonthLayoutRows,
    getWeekOfDay,
} from '../../../_packages_/components/datePicker/common/util';
import { CalendarRedux } from './reduxTypes';
import { CalendarNS } from './types';
import { CalEvtDataNS } from './evtTypes';

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

export function populateMonthWeekByDate(
    date: Date
): CalendarRedux.IDateReducerStats {
    return {
        currentDate: date,
        currentMonth: date.getMonth(),
        currentWeek: getWeekOfDay(date),
        currentYear: date.getFullYear(),
    };
}

export function getYYYYMMDDDate(date: Date) {
    const monthStr =
        date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
    const dateStr =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${date.getFullYear()}${monthStr}${dateStr}`;
}

export function getDateKey(
    item: CalEvtDataNS.ICalEvtCompleteDataModelType
): string {
    function fixedTo2(val: number) {
        return val < 10 ? `0${val}` : `${val}`;
    }
    if (item.type === 'activity') {
        const time = (item as CalEvtDataNS.ICalEvtCompleteActivityDataModel)
            .opts.time;
        // if ((time as CalendarNS.IDBTimingRangeFormat).from) {
        const { year, month, dayAt } = time.from;
        return `${year}${fixedTo2(month)}${fixedTo2(dayAt)}`;
        // }
        // else {
        //     const { year, month, dayAt } = time as CalendarNS.IDBTimingFormat;
        //     return `${year}${fixedTo2(month)}${fixedTo2(dayAt)}`;
        // }
    } else {
        const time = (item as CalEvtDataNS.ICalEvtCompleteReminderDataModel)
            .opts.time;
        const { year, month, dayAt } = time as CalendarNS.IDBTimingFormat;
        return `${year}${fixedTo2(month)}${fixedTo2(dayAt)}`;
    }
}
