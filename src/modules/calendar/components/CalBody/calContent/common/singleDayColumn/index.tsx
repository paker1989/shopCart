import * as React from 'react';

import { CalendarNS } from '../../../../../utils/types';
import CalConfig from '../../../../../assets/scripts/calendar.config';
import { getTimeRange } from '../../../../../utils/timeRangeHelper';
import SingleHourGrid from '../singleHourGrid';
import './singleDayColumn.scss';

const _test_nb_cases = 24;

export interface ISingleDayColumnState {
    isOnDragging: boolean;
    triggerTiming: CalendarNS.ITimingFormat;
    draggingTimeRange: CalendarNS.ITimeRangeFormat;
}

class SingleDayColumn extends React.Component<any, ISingleDayColumnState> {
    constructor(props) {
        super(props);
        this.state = {
            isOnDragging: false,
            triggerTiming: null,
            draggingTimeRange: null,
        };
    }

    onMouseEventChange = (
        timing: CalendarNS.ITimingFormat,
        eventType: CalendarNS.TMinSplitterEventType
    ): void => {
        const { isOnDragging, triggerTiming, draggingTimeRange } = this.state;
        const { hourSplitter } = CalConfig;
        switch (eventType) {
            case 'click':
                console.log('click');
                break;
            case 'mousedown':
                this.setState(
                    {
                        isOnDragging: true,
                        triggerTiming: timing,
                        draggingTimeRange: getTimeRange(
                            timing,
                            timing,
                            hourSplitter
                        ),
                    },
                    () => {
                        console.log('mousedown, trigger currentTimerange: ');
                        console.log(this.state.draggingTimeRange);
                    }
                );
                break;
            case 'mouseup':
                if (isOnDragging) {
                    console.log('mouseup, final Timerange: ');
                    console.log(
                        getTimeRange(triggerTiming, timing, hourSplitter)
                    );
                    this.setState({
                        isOnDragging: false,
                        triggerTiming: null,
                        draggingTimeRange: null,
                    });
                }
                break;
            case 'mouseenter':
                if (!isOnDragging) {
                    return;
                } else {
                    this.setState(
                        {
                            draggingTimeRange: getTimeRange(
                                triggerTiming,
                                timing,
                                hourSplitter
                            ),
                        },
                        () => {
                            console.log('mouseenter, currentTimerange: ');
                            console.log(this.state.draggingTimeRange);
                        }
                    );
                }
                break;
        }
    };

    render() {
        let hourGrids = [];
        for (let i = 0; i < _test_nb_cases; i++) {
            hourGrids.push(
                <li key={`key${i}`}>
                    <SingleHourGrid
                        hourAt={i}
                        onMouseEventChange={this.onMouseEventChange}
                    />
                </li>
            );
        }

        return (
            <div className="calbody-content-singleDayCol-container">
                <ul className="calbody-content-singleDayCol-container_hourWrapper">
                    {hourGrids}
                </ul>
            </div>
        );
    }
}

export default SingleDayColumn;
