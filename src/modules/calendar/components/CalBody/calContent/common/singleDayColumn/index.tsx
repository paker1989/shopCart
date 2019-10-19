import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { isSameDay } from '../../../../../../../_packages_/components/datePicker/common/util';
import CalConfig from '../../../../../assets/scripts/calendar.config';
import * as PopActionCreator from '../../../../../store/action/popAction';
import {
    getCalEventPopPosition,
    getTimeRange,
    getTimeRangeDisplay,
} from '../../../../../utils/timeRangeHelper';
import { CalendarNS } from '../../../../../utils/types';
import CalEventPop from '../../../../common/calEventPop';
import SingleHourGrid from '../singleHourGrid';
import CalNowTimeline from '../../../../common/calNowTimeline';
import CalDaySimpleTimingActivityList from '../../../../common/calDayEvtPresenter/calDaySimpleTimingActivityList';
import { CalendarRedux } from '../../../../../utils/reduxTypes';
import { getYYYYMMDDDate } from '../../../../../utils/timeUtils';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';

import './singleDayColumn.scss';

const _test_nb_cases = 24;

export interface ISingleDayColumnProps
    extends CalendarNS.ICalEventDefinerPopProps {
    value: Date;
    initDefiner: (
        value: Date,
        timeRange: CalendarNS.ITimeRangeFormat,
        dragNode: HTMLDivElement
    ) => void;
    updateDefinerPop?: (options: CalendarRedux.IDefinerPopStats) => void;
    draggingDate?: Date;
    defTimeRange?: CalendarNS.ITimeRangeFormat;
    globalInitStatus?: 'stop' | 'init' | 'ready';
    defShowPop: boolean;
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
}

export interface ISingleDayColumnState {
    dragStatus?: CalendarNS.TCalEventPopDragStatusType;
    triggerTiming: CalendarNS.ITimingFormat;
    draggingTimeRange: CalendarNS.ITimeRangeFormat;
}

const mapStateToProps = (state, ownProps) => ({
    locale: state.layoutReducers.locale,
    defTimeRange: state.popReducers.defTimeRange,
    globalInitStatus: state.popReducers.globalInitStatus,
    defShowPop: state.popReducers.defShowPop,
    evts: state.evtsReducers.cachedEvts[getYYYYMMDDDate(ownProps.value)],
});

export const mapDispatchToProps = dispatcher => ({
    updateDefinerPop: (opts: CalendarRedux.IDefinerPopStats) =>
        dispatcher(PopActionCreator.updateDefinerPop(opts)),
});

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
        };
        this.colRef = React.createRef();
    }

    componentDidUpdate(prevProps: ISingleDayColumnProps) {
        const {
            value,
            draggingDate,
            globalInitStatus,
            defTimeRange,
            updateDefinerPop,
            defShowPop,
        } = this.props;
        const { dragStatus } = this.state;
        if (
            // handle weekLayout case: cancel dragging when drag on other ones
            draggingDate &&
            isSameDay(value, draggingDate) === false &&
            dragStatus === 'holdon'
        ) {
            this.cancelDragging();
        }

        // handle global anti-create event
        if (prevProps.defShowPop && !defShowPop) {
            this.cancelDragging();
        }

        // handle click on 'create evt'
        if (
            prevProps.globalInitStatus !== 'init' &&
            globalInitStatus === 'init' &&
            isSameDay(value, defTimeRange.from.dayAt)
        ) {
            this.handleOnClick(defTimeRange.from);
            updateDefinerPop({ globalInitStatus: 'ready' });
        }
    }

    handleOnClick = (triggerTiming: CalendarNS.ITimingFormat) => {
        this.onMouseEventChange(triggerTiming, 'mousedown');
        setTimeout(() => {
            this.onMouseEventChange(triggerTiming, 'mouseup');
        }, 0);
    };

    getDragNode = (
        newTimeRange: CalendarNS.ITimeRangeFormat
    ): Promise<CalendarNS.ISimuBoundingClientRect> => {
        return new Promise(resolve => {
            this.setState(
                {
                    draggingTimeRange: newTimeRange,
                },
                () => {
                    resolve(this.eventPopRef.current.getBoundingClientRect());
                }
            );
        });
    };

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
        const { initDefiner, value } = this.props;

        if (dragStatus === 'dragging') {
            initDefiner(value, draggingTimeRange, this.eventPopRef.current);
            this.setState({ dragStatus: 'holdon' }, () => {
                window.removeEventListener('mouseup', this.holdonDragging);
            });
        }
    };

    cancelDragging = () => {
        this.setState({
            dragStatus: 'none',
            draggingTimeRange: null,
            triggerTiming: null,
        });
    };

    onMouseEventChange = (
        timing: CalendarNS.ITimingFormat,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { dragStatus, triggerTiming } = this.state;
        const { hourSplitter } = CalConfig;

        switch (eventType) {
            case 'click':
                console.log('click');
                break;
            case 'mousedown':
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

    getHourGrids = (value: Date) => {
        const hourGrids = [];
        for (let i = 0; i < _test_nb_cases; i++) {
            hourGrids.push(
                <li key={`key${i}`}>
                    <SingleHourGrid
                        dayAt={value}
                        hourAt={i}
                        onMouseEventChange={this.onMouseEventChange}
                    />
                </li>
            );
        }
        return hourGrids;
    };

    render() {
        const { dragStatus, draggingTimeRange } = this.state;
        const { value, evts } = this.props;

        let minSplitterHeight;
        let _self = this.colRef.current;
        if (_self) {
            minSplitterHeight =
                _self.clientHeight / (24 * CalConfig.hourSplitter);
        }

        const calEvtPopStyle = getCalEventPopPosition(
            minSplitterHeight,
            draggingTimeRange
        );
        const HourGrids = this.getHourGrids(value);
        // do not display timing reminder
        const timingEvts = evts
            ? evts.filter(evt => !evt.allDayEvt && evt.type === 'activity')
            : null;

        const displayNowTimeline = isSameDay(value, new Date());
        return (
            <div
                ref={this.colRef}
                className="calbody-content-singleDayCol-container"
            >
                {displayNowTimeline && <CalNowTimeline />}
                <ul className="calbody-content-singleDayCol-container_hourWrapper">
                    {HourGrids}
                </ul>
                {dragStatus !== 'none' && (
                    <CalEventPop
                        getDragPopNode={this.getDragPopNode}
                        type={dragStatus}
                        popStyle={calEvtPopStyle}
                        content={getTimeRangeDisplay(draggingTimeRange, '12h')}
                    />
                )}
                {timingEvts && (
                    <CalDaySimpleTimingActivityList
                        evts={timingEvts}
                        minSplitterHeight={minSplitterHeight}
                    />
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(SingleDayColumn));
