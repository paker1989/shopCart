import { CalendarNS } from './types';

export function getTimeRange(
    triggerAt: CalendarNS.ITimingFormat,
    currentAt: CalendarNS.ITimingFormat,
    splitOn: number
): CalendarNS.ITimeRangeFormat {
    function getTimingFloat(hourAt: number, minAt: number): number {
        return hourAt + minAt / 60;
    }
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
    // console.log('timeing = ' + JSON.stringify(timing) + '; addedMin = ' + addedMin);
    let minAt = (timing.minAt + addedMin) % 60;
    let addHour = Math.floor((timing.minAt + addedMin) / 60);
    let newHour = timing.hourAt + addHour > 23 ? 0 : timing.hourAt + addHour;

    // console.log('hourAt = ' + newHour +', minAt = ' +minAt);
    return {
        hourAt: newHour,
        minAt,
    };
}
