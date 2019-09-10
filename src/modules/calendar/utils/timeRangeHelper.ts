import CalConfig from '../assets/scripts/calendar.config.js';
import { CalendarNS } from './types';
import { isSameDay } from '../../../_packages_/components/datePicker/common/util';
import { func } from 'prop-types';

const _MIN_SPLITTER_ = 60 / CalConfig.hourSplitter;

function getTimingFloat(hourAt: number, minAt: number): number {
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
): string {
    switch (pattern) {
        case '24h':
            return (
                `${timing.hourAt}点` +
                (timing.minAt === 0 ? '' : `${timing.minAt}分`)
            );
        case '12h':
            const isMorning = timing.hourAt < 12;
            const dayDisplay = isMorning ? '上午' : '下午';
            const hourDisplay =
                timing.hourAt > 12 ? timing.hourAt - 12 : timing.hourAt;
            const minDisplay =
                timing.minAt < 10 ? `0${timing.minAt}` : `${timing.minAt}`;
            return `${dayDisplay}${hourDisplay}:${minDisplay}`;
    }
    return '';
}

export function getTimeRangeDisplay(
    timeRange: CalendarNS.ITimeRangeFormat
): string {
    let message = '';
    if (!timeRange) {
        return message;
    }
    if (isSameTiming(timeRange.from, timeRange.to, false)) {
        message = getTimingDisplay(timeRange.from);
    } else {
        message = `${getTimingDisplay(timeRange.from)} - ${getTimingDisplay(
            timeRange.to
        )}`;
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
    const fromForCompare = new Date(dateRange.from.dayAt);
    fromForCompare.setHours(0);
    fromForCompare.setMinutes(0);
    const toForCompare = new Date(dateRange.to.dayAt);
    toForCompare.setHours(0);
    toForCompare.setMinutes(0);

    const isInvolved =
        target.getTime() >= fromForCompare.getTime() &&
        target.getTime() <= toForCompare.getTime();

    const isWeekStart = rowIndex === 0;
    const isStart = isSameDay(target, dateRange.from.dayAt);
    const isEnd = isSameDay(target, dateRange.to.dayAt);

    dateRange.from.dayAt.getMinutes();
    return { isInvolved, isWeekStart, isStart, isEnd };
}
