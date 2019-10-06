import { useEffect, useState } from 'react';
import { convertTimeFormatToDate } from '../timeRangeHelper';
import { CalendarNS } from '../types';

function getTiming(
    a: CalendarNS.ITimeRangeFormat | CalendarNS.ITimingFormat
): CalendarNS.ITimingFormat {
    if ((a as CalendarNS.ITimeRangeFormat).from) {
        return (a as CalendarNS.ITimeRangeFormat).from;
    } else {
        return a as CalendarNS.ITimingFormat;
    }
}
/**
 * @returns sort result by from timing
 */
export default (
    a: CalendarNS.ITimeRangeFormat | CalendarNS.ITimingFormat,
    b: CalendarNS.ITimeRangeFormat | CalendarNS.ITimingFormat
): number => {
    const [compareRes, setCompareRes] = useState(-1);

    useEffect(() => {
        const aFrom = getTiming(a);
        const bFrom = getTiming(b);
        const dateA = convertTimeFormatToDate(aFrom);
        const dateB = convertTimeFormatToDate(bFrom);
        setCompareRes(dateA.getTime() - dateB.getTime());
    });

    return compareRes;
};
