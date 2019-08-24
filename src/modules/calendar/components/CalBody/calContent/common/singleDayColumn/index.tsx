import * as React from 'react';

import SingleHourGrid from '../singleHourGrid';
import './singleDayColumn.scss';

const _test_nb_cases = 24;

class SingleDayColumn extends React.Component<any, any> {
    render() {
        let hourCases = [];
        for (let i = 0; i < _test_nb_cases; i++) {
            hourCases.push(
                <li key={`key${i}`}>
                    <SingleHourGrid hourAt={i + 1} />
                </li>
            );
        }

        return (
            <div className="calbody-content-singleDayCol-container">
                <ul className="calbody-content-singleDayCol-container_hourWrapper">
                    {hourCases}
                </ul>
            </div>
        );
    }
}

export default SingleDayColumn;
