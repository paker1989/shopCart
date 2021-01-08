import * as React from 'react';

import './weekLine.scss';

export interface IWeekLineProps {
    weeks: number[];
}

class WeekLine extends React.PureComponent<IWeekLineProps, any> {
    render() {
        const { weeks } = this.props;
        const itemStyle: React.CSSProperties = {
            height: `${100 / weeks.length}%`,
        };

        return (
            <div className="weekLine-container">
                <div className="weekLine-container__placeholder" />
                <div className="weekLine-container__items">
                    {weeks.map((week, index) => (
                        <div
                            key={`weekLabel-${index}`}
                            className="weekLine-container-item"
                            style={itemStyle}
                        >
                            {week}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default WeekLine;
