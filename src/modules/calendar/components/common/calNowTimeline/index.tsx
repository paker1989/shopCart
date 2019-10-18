import * as React from 'react';

import './calNowTimeline.scss';

export interface ICalNowTimelineProps {
//   getRef: (parentRef: React.RefObject<HTMLDivElement>) => void;
}

const CalNowTimeline = (props: ICalNowTimelineProps) => {
    return (
       <div className="cal-nowtimeline">
           <div className="is-dot"></div>
           <div className="is-line"></div>
       </div>
    );
}

export default CalNowTimeline;