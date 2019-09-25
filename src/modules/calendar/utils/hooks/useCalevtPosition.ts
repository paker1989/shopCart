// import { useState, useEffect } from "react"

//  const useMonthConverter = (currentWeek) => {
//     const [displayMonth, setDisplayMonth] = useState({});

//     useEffect(() => {

//     }, [currentWeek]);
//  }
import * as React from 'react';
import { useState, useEffect } from 'react';
import { CalendarNS } from '../types';
import { getCalEventPopPosition } from '../timeRangeHelper';

export default (
    heightPerSplitter: number,
    timeRange: CalendarNS.ITimeRangeFormat
): React.CSSProperties => {
    const [calEvtPosition, setCalEvtPosition] = useState({});
    useEffect(() => {
        const calEvtPosition = getCalEventPopPosition(
            heightPerSplitter,
            timeRange
        );
        setCalEvtPosition(calEvtPosition);
    }, [timeRange, heightPerSplitter]);

    return calEvtPosition;
};
