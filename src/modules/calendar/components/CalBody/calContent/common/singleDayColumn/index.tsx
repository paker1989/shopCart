import * as React from 'react';

import CalEventPop from '../calEventPop';
import SingleHourGrid from '../singleHourGrid';
import CalEventDefiner from '../../../../common/calEventDefiner';

import CalConfig from '../../../../../assets/scripts/calendar.config';
import { getTimeRange } from '../../../../../utils/timeRangeHelper';
import { isSameDay } from '@component/datePicker/common/util';
import { CalendarNS } from '../../../../../utils/types';

import './singleDayColumn.scss';

const _test_nb_cases = 24;

export interface ISingleDayColumnProps {
    value: Date;
    draggingDate?: Date;
    onInitDragging?: (draggingDate: Date) => void;
    positionner?: (...args) => {};
}

export interface ISingleDayColumnState {
    dragStatus?: CalendarNS.TCalEventPopDragStatusType;
    triggerTiming: CalendarNS.ITimingFormat;
    draggingTimeRange: CalendarNS.ITimeRangeFormat;
    definePopId?: string;
}

class SingleDayColumn extends React.Component<
    ISingleDayColumnProps,
    ISingleDayColumnState
> {
    colRef?: React.RefObject<HTMLDivElement>;
    eventPopRef?: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.state = {
            dragStatus: 'none',
            triggerTiming: null,
            draggingTimeRange: null,
            definePopId: null,
        };
        this.colRef = React.createRef();
    }

    componentDidUpdate() {
        const { value, draggingDate } = this.props;
        const { dragStatus } = this.state;
        if (
            draggingDate &&
            isSameDay(value, draggingDate) === false &&
            dragStatus !== 'none'
        ) {
            this.cancelDragging();
        }
    }

    initDragging = (timing: CalendarNS.ITimingFormat) => {
        const { hourSplitter } = CalConfig;
        this.setState({
            dragStatus: 'dragging',
            triggerTiming: timing,
            draggingTimeRange: getTimeRange(timing, timing, hourSplitter),
        });
        window.addEventListener('mouseup', this.holdonDragging);
    };

    holdonDragging = () => {
        const { dragStatus, draggingTimeRange } = this.state;
        const { positionner } = this.props;

        if (dragStatus === 'dragging') {
            let definePopId = CalEventDefiner.initDefine({
                timeRange: draggingTimeRange,
                positionner: positionner || CalEventDefiner.Position.autoMiddle,
                dragPopNode: this.eventPopRef.current,
                bottomCurshion: 50,
                topCurshion: 30,
            });
            this.setState({ dragStatus: 'holdon', definePopId }, () => {
                window.removeEventListener('mouseup', this.holdonDragging);
            });
        }
    };

    cancelDragging = (cb?: any) => {
        const { definePopId } = this.state;
        CalEventDefiner.destroyDefiner(definePopId);
        this.setState(
            {
                dragStatus: 'none',
                triggerTiming: null,
                draggingTimeRange: null,
                definePopId: null,
            },
            cb
        );
    };

    onMouseEventChange = (
        timing: CalendarNS.ITimingFormat,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { dragStatus, triggerTiming, definePopId } = this.state;
        const { onInitDragging, value } = this.props;
        const { hourSplitter } = CalConfig;

        switch (eventType) {
            case 'click':
                console.log('click');
                break;
            case 'mousedown':
                if (dragStatus === 'holdon') {
                    CalEventDefiner.destroyDefiner(definePopId); // destroy holdon pop if exist
                }
                onInitDragging && onInitDragging(value); // inform parent to clean other
                this.initDragging(timing); // init
                break;
            case 'mouseup':
                if (dragStatus === 'dragging') {
                    this.holdonDragging();
                }
                break;
            case 'mouseenter':
                if (dragStatus !== 'dragging') {
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

    getDragPopNode = (ref: React.RefObject<HTMLDivElement>): void => {
        this.eventPopRef = ref;
    };

    render() {
        const { dragStatus, draggingTimeRange } = this.state;

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
                {dragStatus !== 'none' && (
                    <CalEventPop
                        getDragPopNode={this.getDragPopNode}
                        type={dragStatus}
                        timeRange={draggingTimeRange}
                        heightPerUnit={minSplitterHeight}
                    />
                )}
            </div>
        );
    }
}

export default SingleDayColumn;
