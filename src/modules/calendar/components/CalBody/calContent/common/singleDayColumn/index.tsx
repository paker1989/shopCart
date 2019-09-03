import * as React from 'react';
import CalConfig from '../../../../../assets/scripts/calendar.config';
import { getTimeRange } from '../../../../../utils/timeRangeHelper';
import { CalendarNS } from '../../../../../utils/types';
import CalEventPop from '../calEventPop';
import SingleHourGrid from '../singleHourGrid';
import './singleDayColumn.scss';

const _test_nb_cases = 24;

export interface ISingleDayColumnState {
    isOnDragging: boolean;
    triggerTiming: CalendarNS.ITimingFormat;
    draggingTimeRange: CalendarNS.ITimeRangeFormat;
}

class SingleDayColumn extends React.Component<any, ISingleDayColumnState> {
    colRef?: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.colRef = React.createRef();

        this.state = {
            isOnDragging: false,
            triggerTiming: null,
            draggingTimeRange: null,
        };
    }

    onMouseEventChange = (
        timing: CalendarNS.ITimingFormat,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { isOnDragging, triggerTiming } = this.state;
        const { hourSplitter } = CalConfig;

        switch (eventType) {
            case 'click':
                console.log('click');
                break;
            case 'mousedown':
                this.setState({
                    isOnDragging: true,
                    triggerTiming: timing,
                    draggingTimeRange: getTimeRange(
                        timing,
                        timing,
                        hourSplitter
                    ),
                }, () => {
                    window.addEventListener('mouseup', this.stopDragging);
                });
                break;
            case 'mouseup':
                if (isOnDragging) {
                    this.stopDragging();
                }
                break;
            case 'mouseenter':
                if (!isOnDragging) {
                    return;
                } else {
                    this.setState({
                        draggingTimeRange: getTimeRange(
                            triggerTiming,
                            timing,
                            hourSplitter
                        ),
                    });
                }
                break;
        }
    };

    stopDragging = () => {
        const { isOnDragging } = this.state;

        if (isOnDragging) {
            this.setState({
                isOnDragging: false,
                triggerTiming: null,
                draggingTimeRange: null,
            }, () => {
                window.removeEventListener('mouseup', this.stopDragging);
            });
        }
    }

    render() {
        const { isOnDragging, draggingTimeRange } = this.state;

        let minSplitterHeight;
        let _self = this.colRef.current;
        if (_self) {
            minSplitterHeight =
                _self.clientHeight / (24 * CalConfig.hourSplitter);
        }

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
            <div
                ref={this.colRef}
                className="calbody-content-singleDayCol-container"
            >
                <ul className="calbody-content-singleDayCol-container_hourWrapper">
                    {hourGrids}
                </ul>
                {isOnDragging && (
                    <CalEventPop
                        type="dragging"
                        timeRange={draggingTimeRange}
                        heightPerUnit={minSplitterHeight}
                    />
                )}
            </div>
        );
    }
}

export default SingleDayColumn;
