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
            const minDisplay = timing.minAt < 10 ? `0${timing.minAt}`:`${timing.minAt}`
            return (
                `${dayDisplay}${hourDisplay}:${minDisplay}`
            );
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
): CalendarNS.IDateRangeFormat {
    const dateRange = {
        from: date1.getTime() < date2.getTime() ? date1 : date2,
        to: date1.getTime() < date2.getTime() ? date2 : date1,
    };
    // console.log('date range:' + dateRange.from + " to " + dateRange.to);
    return dateRange;
}

export function getCalEventProps(
    dateRange: CalendarNS.IDateRangeFormat,
    rowIndex: number,
    target: Date
): CalendarNS.IMonthCalEventProps {
    const isInvolved =
        target.getTime() >= dateRange.from.getTime() &&
        target.getTime() <= dateRange.to.getTime();
    const isWeekStart = rowIndex === 0;
    const isStart = isSameDay(target, dateRange.from);
    const isEnd = isSameDay(target, dateRange.to);

    return { isInvolved, isWeekStart, isStart, isEnd };
}
