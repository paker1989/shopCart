import * as React from 'react';
import { FormattedTime } from 'react-intl';

import {
    isSameDay,
    isIncludeDate,
    getMonthLayoutRows,
    isMonthLayoutContainDate,
} from '../../../_packages_/components/datePicker/common/util';
import { getTimingActivityZIndexConst } from './calZIndexManager';
import { populateMonthWeekByDate, getDayRangeOfWeek } from '../utils/timeUtils';
import CalConfig from '../assets/scripts/calendar.config';
import { CalendarNS } from './types';
import { CalEvtDataNS } from './evtTypes';
import { func } from 'prop-types';

export const _MIN_SPLITTER_ = 60 / CalConfig.hourSplitter;

export function getTimingFloat(hourAt: number, minAt: number): number {
    return hourAt + minAt / 60;
}

export function convertTimeFormatToDate(
    timing: CalendarNS.ITimingFormat
): Date {
    return new Date(
        timing.dayAt.getFullYear(),
        timing.dayAt.getMonth(),
        timing.dayAt.getDate(),
        timing.hourAt,
        timing.minAt
    );
}

export function getTimeRange(
    triggerAt: CalendarNS.ITimingFormat,
    currentAt: CalendarNS.ITimingFormat,
    splitOn: number
): CalendarNS.ITimeRangeFormat {
    let triggerAtFloat = getTimingFloat(triggerAt.hourAt, triggerAt.minAt);
    let currentAtFloat = getTimingFloat(currentAt.hourAt, currentAt.minAt);

    let from = triggerAtFloat > currentAtFloat ? currentAt : triggerAt;
    let to = triggerAtFloat > currentAtFloat ? triggerAt : currentAt;

    to = convertMinAddToTiming(convertTimeFormatToDate(to), 60 / splitOn);

    return {
        from,
        to,
    };
}

export function convertMinAddToTiming(
    dayAt: Date,
    addedMin: number
): CalendarNS.ITimingFormat {
    const addedDate = convertMinAddToDate(dayAt, addedMin);

    return {
        dayAt: addedDate,
        hourAt: addedDate.getHours(),
        minAt: addedDate.getMinutes(),
    };
}

export function convertMinAddToDate(dayAt: Date, addedMin: number): Date {
    return new Date(
        dayAt.getFullYear(),
        dayAt.getMonth(),
        dayAt.getDate(),
        dayAt.getHours(),
        dayAt.getMinutes() + addedMin
    );
}

export function convertDateToITimingFormat(
    day: Date
): CalendarNS.ITimingFormat {
    return {
        dayAt: day,
        hourAt: day.getHours(),
        minAt: day.getMinutes(),
    };
}

/**
 * @return `timerange`时间差换算成分钟
 * @param timeRange
 */
export function getAddedMinOfTimeRange(
    timeRange: CalendarNS.ITimeRangeFormat
): number {
    let fromFloat = getTimingFloat(timeRange.from.hourAt, timeRange.from.minAt);
    let toFloat = getTimingFloat(timeRange.to.hourAt, timeRange.to.minAt);
    return (toFloat - fromFloat) * 60;
}

export function getCalEventPopPosition(
    heightPerSplitter: number,
    timeRange: CalendarNS.ITimeRangeFormat
): CalendarNS.ICalEventPopDynamicStyleFormat {
    if (!heightPerSplitter || !timeRange) {
        return {};
    }
    let fromFloat = getTimingFloat(timeRange.from.hourAt, timeRange.from.minAt);
    let addedMin = getAddedMinOfTimeRange(timeRange);
    return {
        height: heightPerSplitter * (addedMin / _MIN_SPLITTER_),
        top: heightPerSplitter * CalConfig.hourSplitter * fromFloat,
    };
}

export function getCalTimingActivitySiblingPosition(
    stIndex: number,
    stArrayLenth: number
): React.CSSProperties {
    if (stIndex === -1 || stIndex > stArrayLenth - 1) {
        return {};
    }
    return {
        width: `${(1 - stIndex / stArrayLenth) * 100}%`,
        left: `${(stIndex / stArrayLenth) * 100}%`,
        zIndex: getTimingActivityZIndexConst() + stIndex,
    };
}

/**
 * @return if it is same timing
 * @param from
 * @param to
 * @param isStrict: if false, then return `true`
 * if timerange is equals to one _min_splitter
 */
export function isSameTiming(
    from: CalendarNS.ITimingFormat,
    to: CalendarNS.ITimingFormat,
    isStrict: boolean = true
): boolean {
    const addedMin = getAddedMinOfTimeRange({ from, to });
    return isStrict ? addedMin === 0 : addedMin <= _MIN_SPLITTER_;
}

export function getTimingDisplay(
    timing: CalendarNS.ITimingFormat,
    pattern: CalendarNS.TTimingDisplayPattern = '24h'
): any {
    const date = new Date(timing.dayAt);
    date.setHours(timing.hourAt);
    date.setMinutes(timing.minAt);
    return <FormattedTime value={date} hour12={pattern === '12h'} />;
}

export function getDBTimeRangeDisplay(
    dbTime: CalendarNS.IDBTimingFormat | CalendarNS.IDBTimingRangeFormat,
    pattern: CalendarNS.TTimingDisplayPattern = '24h'
) {
    const timeRange = convertDBTimingToTimRange(dbTime);
    return getTimeRangeDisplay(timeRange, pattern);
}

export function getTimeRangeDisplay(
    timeRange: CalendarNS.ITimeRangeFormat,
    pattern: CalendarNS.TTimingDisplayPattern = '24h'
): any {
    let message = '';
    if (!timeRange) {
        return message;
    }
    if (isSameTiming(timeRange.from, timeRange.to, false)) {
        message = getTimingDisplay(timeRange.from);
    } else {
        return (
            <React.Fragment>
                {getTimingDisplay(timeRange.from, pattern)}
                {' - '}
                {getTimingDisplay(timeRange.to, pattern)}
            </React.Fragment>
        );
    }
    return message;
}

export function getDateRange(
    date1: Date,
    date2: Date
): CalendarNS.ITimeRangeFormat {
    const hourSplitter = CalConfig.hourSplitter;
    const fromDate = date1.getTime() < date2.getTime() ? date1 : date2;
    const toDate = date1.getTime() < date2.getTime() ? date2 : date1;
    const now = new Date();

    fromDate.setHours(now.getHours());
    fromDate.setMinutes(now.getMinutes());

    toDate.setHours(now.getHours());
    toDate.setMinutes(now.getMinutes());

    const formattedFromDate = getSplitteredDate(fromDate, hourSplitter);
    const formattedToDate = getSplitteredDate(toDate, hourSplitter);
    return {
        from: {
            dayAt: formattedFromDate,
            hourAt: formattedFromDate.getHours(),
            minAt: formattedFromDate.getMinutes(),
        },
        to: convertMinAddToTiming(formattedToDate, 60 / hourSplitter),
    };
}

export function getCalEventProps(
    dateRange: CalendarNS.ITimeRangeFormat,
    rowIndex: number,
    target: Date
): CalendarNS.IMonthCalEventProps {
    const dates = [dateRange.from.dayAt, dateRange.to.dayAt];
    const isInvolved = isIncludeDate(dates, target);

    const isWeekStart = rowIndex === 0;
    const isStart = isSameDay(target, dateRange.from.dayAt);
    const isEnd = isSameDay(target, dateRange.to.dayAt);

    return { isInvolved, isWeekStart, isStart, isEnd };
}

export function getGlobalTimeRange(
    layout: string,
    currentDate: Date
): CalendarNS.ITimeRangeFormat {
    const _is_display_we = true,
        today = new Date(),
        hourSplitter = CalConfig.hourSplitter,
        { currentMonth, currentWeek, currentYear } = populateMonthWeekByDate(
            currentDate
        );
    let dayAt: Date;
    switch (layout) {
        case 'day':
            dayAt = getSplitteredDate(currentDate, hourSplitter);
            break;
        case 'week':
            const daysOfWeek = getDayRangeOfWeek(
                currentYear,
                currentWeek,
                _is_display_we
            );
            dayAt = isIncludeDate(daysOfWeek, today) ? today : daysOfWeek[0];
            dayAt = getSplitteredDate(dayAt, hourSplitter);
            break;
        case 'month':
            const monthRows = getMonthLayoutRows(
                currentYear,
                currentMonth + 1,
                _is_display_we
            );
            if (isMonthLayoutContainDate(monthRows, today)) {
                dayAt = getSplitteredDate(today, hourSplitter);
            } else {
                const minDate = monthRows.rows[0][0];
                dayAt = getSplitteredDate(
                    new Date(
                        minDate.yearD,
                        minDate.monthD - 1,
                        minDate.showDate
                    ),
                    hourSplitter
                );
            }
            break;
        case 'year':
            if (currentYear === today.getFullYear()) {
                dayAt = getSplitteredDate(today, hourSplitter);
            } else {
                dayAt = getSplitteredDate(
                    new Date(currentYear, 0, 1),
                    hourSplitter
                );
            }
            break;
    }

    return {
        from: {
            dayAt,
            hourAt: dayAt.getHours(),
            minAt: dayAt.getMinutes(),
        },
        to: convertMinAddToTiming(dayAt, 60 / hourSplitter),
    };
}

export function getSplitteredDate(date: Date, splitTo: number) {
    const minAt = date.getMinutes();
    const minPerUnit = 60 / splitTo;
    const formattedMin = minAt - (minAt % minPerUnit);
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        formattedMin
    );
}

/**
 * @return if two time range is doubled
 * @param a
 * @param b
 */
export function isTimeRangeDoubled(
    a: CalendarNS.ITimeRangeFormat,
    b: CalendarNS.ITimeRangeFormat
) {
    const af = getTimingFloat(a.from.hourAt, a.from.minAt);
    const at = getTimingFloat(a.to.hourAt, a.to.minAt);
    const bf = getTimingFloat(b.from.hourAt, b.from.minAt);
    const bt = getTimingFloat(b.to.hourAt, b.to.minAt);
    // console.log(
    //     af +
    //         ' - ' +
    //         at +
    //         '  :  ' +
    //         bf +
    //         ' - ' +
    //         bt +
    //         ', result = ' +
    //         (bf <= at && af <= bt)
    // );
    return bf < at && af < bt;
}

export function getTiming(
    a: CalendarNS.IDBTimingRangeFormat | CalendarNS.IDBTimingFormat
): CalendarNS.IDBTimingFormat {
    if ((a as CalendarNS.IDBTimingRangeFormat).from) {
        return (a as CalendarNS.IDBTimingRangeFormat).from;
    } else {
        return a as CalendarNS.IDBTimingFormat;
    }
}

export function convertDBTimeFormatToDate(
    timing: CalendarNS.IDBTimingFormat
): Date {
    return new Date(
        timing.year,
        timing.month - 1,
        timing.dayAt,
        timing.hourAt,
        timing.minAt
    );
}

/**
 * @returns sort result by from timing
 */
export function compareTiming(
    a: CalendarNS.IDBTimingRangeFormat | CalendarNS.IDBTimingFormat,
    b: CalendarNS.IDBTimingRangeFormat | CalendarNS.IDBTimingFormat
): number {
    const aFrom = getTiming(a);
    const bFrom = getTiming(b);
    const dateA = convertDBTimeFormatToDate(aFrom);
    const dateB = convertDBTimeFormatToDate(bFrom);

    return dateA.getTime() - dateB.getTime();
}

export function convertDBTimingToTimRange(
    a: CalendarNS.IDBTimingRangeFormat | CalendarNS.IDBTimingFormat
): CalendarNS.ITimeRangeFormat {
    if ((a as CalendarNS.IDBTimingRangeFormat).from) {
        const dbTimerange = a as CalendarNS.IDBTimingRangeFormat;
        const fromDate = convertDBTimeFormatToDate(dbTimerange.from);
        const toDate = convertDBTimeFormatToDate(dbTimerange.to);
        return {
            from: {
                dayAt: fromDate,
                hourAt: fromDate.getHours(),
                minAt: fromDate.getMinutes(),
            },
            to: {
                dayAt: toDate,
                hourAt: toDate.getHours(),
                minAt: toDate.getMinutes(),
            },
        };
    } else {
        const fromDBTiming = a as CalendarNS.IDBTimingFormat;
        const fromDate = convertDBTimeFormatToDate(fromDBTiming);
        const toDate = new Date(fromDate.getTime());
        toDate.setMinutes(toDate.getMinutes() + 30);
        return {
            from: {
                dayAt: fromDate,
                hourAt: fromDate.getHours(),
                minAt: fromDate.getMinutes(),
            },
            to: {
                dayAt: toDate,
                hourAt: toDate.getHours(),
                minAt: toDate.getMinutes(),
            },
        };
    }
}

/**
 * @description convert ICalEvtSortedItemType.from timing to Date
 * @param sortedEvt
 */
export function getFromDateFromDBItem(
    sortedEvt: CalEvtDataNS.ICalEvtSortedItemType
): Date {
    if (sortedEvt.type === 'activity') {
        const activityItem = sortedEvt as CalEvtDataNS.ICalEvtCompleteActivityDataModel;
        return convertDBTimeFormatToDate(getTiming(activityItem.opts.time));
    } else {
        const reminderItem = sortedEvt as CalEvtDataNS.ICalEvtSortedReminderDataModel;
        if (!reminderItem.time) {
            console.log('reminder is not timing evt');
            return null;
        }
        return convertDBTimeFormatToDate(getTiming(reminderItem.time));
    }
}

export function getDBTimingFromTimingItem(
    sortedEvt: CalEvtDataNS.ICalEvtSortedItemType
): CalendarNS.IDBTimingRangeFormat | CalendarNS.IDBTimingFormat {
    if (sortedEvt.type === 'activity') {
        const activityItem = sortedEvt as CalEvtDataNS.ICalEvtCompleteActivityDataModel;
        return activityItem.opts.time;
    } else {
        const reminderItem = sortedEvt as CalEvtDataNS.ICalEvtSortedReminderDataModel;
        if (!reminderItem.time) {
            console.log('reminder is not timing evt');
            return null;
        }
        return reminderItem.time;
    }
}
