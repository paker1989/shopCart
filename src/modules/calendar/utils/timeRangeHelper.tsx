import * as React from 'react';
import { FormattedTime } from 'react-intl';

import CalConfig from '../assets/scripts/calendar.config';
import { CalendarNS } from './types';
import {
    isSameDay,
    isIncludeDate,
} from '../../../_packages_/components/datePicker/common/util';
import { func } from 'prop-types';

export const _MIN_SPLITTER_ = 60 / CalConfig.hourSplitter;

export function getTimingFloat(hourAt: number, minAt: number): number {
    return hourAt + minAt / 60;
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

    to = convertMinAddToTiming(to, 60 / splitOn);

    return {
        from,
        to,
    };
}

export function convertMinAddToTiming(
    timing: CalendarNS.ITimingFormat,
    addedMin: number
): CalendarNS.ITimingFormat {
    let minAt = (timing.minAt + addedMin) % 60;
    let addHour = Math.floor((timing.minAt + addedMin) / 60);

    const isNewDay = timing.hourAt + addHour > 23;
    let newHour = isNewDay
        ? (timing.hourAt + addHour) % 23
        : timing.hourAt + addHour;
    if (isNewDay) {
        timing.dayAt.setDate(
            timing.dayAt.getDate() + Math.floor((timing.hourAt + addHour) / 23)
        );
    }

    return {
        dayAt: timing.dayAt,
        hourAt: newHour,
        minAt,
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
    const fromDate = date1.getTime() < date2.getTime() ? date1 : date2;
    const toDate = date1.getTime() < date2.getTime() ? date2 : date1;
    const now = new Date();

    fromDate.setHours(now.getHours());
    fromDate.setMinutes(now.getMinutes());

    toDate.setHours(now.getHours());
    toDate.setMinutes(now.getMinutes());

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
    layout: string
): CalendarNS.ITimeRangeFormat {
    return {
        from: {
            dayAt: new Date(),
            hourAt: 10,
            minAt: 0,
        },
        to: {
            dayAt: new Date(),
            hourAt: 12,
            minAt: 0,
        },
    };
}
