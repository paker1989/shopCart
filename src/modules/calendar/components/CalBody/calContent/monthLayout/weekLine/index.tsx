import * as React from 'react';

import './weekLine.scss';

export interface IWeekLineProps {
    firstWeek: number;
    nbWeeks: number;
}

const _test_data_props = [];

class WeekLine extends React.PureComponent<IWeekLineProps, any> {
    render() {
        const { firstWeek, nbWeeks } = this.props;
        const weekLabes = [];

        const itemStyle: React.CSSProperties = {
            height: `${100 / nbWeeks}%`,
        };

        for (let i = 0; i < nbWeeks; i++) {
            weekLabes.push(
                <div
                    key={`weekLabel-${i}`}
                    className="weekLine-container-item"
                    style={itemStyle}
                >
                    {firstWeek + i}
                </div>
            );
        }
        return (
            <div className="weekLine-container">
                <div className="weekLine-container__placeholder"></div>
                <div className="weekLine-container__items">{weekLabes}</div>
            </div>
        );
    }
}

export default WeekLine;
