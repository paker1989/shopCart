import * as React from 'react';
import { useEffect, useState } from 'react';
import { getTimingFloat } from '../../../utils/timeRangeHelper';

import './calNowTimeline.scss';

const CalNowTimeline = props => {
    const [position, setPosition] = useState({});
    let updateInterval = null;

    useEffect(() => {
        const exec = () => {
            const now = new Date();
            const currentPerctge =
                getTimingFloat(now.getHours(), now.getMinutes()) / 24;

            setPosition({
                top: `${(currentPerctge * 100).toFixed(2)}%`,
            });
        };
        exec();
        updateInterval = setInterval(exec, 1000 * 60 * 5); //update every 5 mins
        return () => {
            clearInterval(updateInterval);
        };
    }, []);
    return (
        <div className="cal-nowtimeline" style={position}>
            <div className="is-dot"></div>
            <div className="is-line"></div>
        </div>
    );
};

export default CalNowTimeline;
