import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { isSameDay } from '../../../../../../../_packages_/components/datePicker/common/util';
import CalConfig from '../../../../../assets/scripts/calendar.config';
import {
    getCalEventPopPosition,
    getTimeRange,
    getTimeRangeDisplay,
} from '../../../../../utils/timeRangeHelper';
import { CalendarNS } from '../../../../../utils/types';
import CalEventPop from '../../../../common/calEventPop';
import SingleHourGrid from '../singleHourGrid';
import './singleDayColumn.scss';

const _test_nb_cases = 24;

export interface ISingleDayColumnProps
    extends CalendarNS.ICalEventDefinerPopProps {
    value: Date;
    definerCalEvtSignal?: boolean;
    initDefiner: (
        value: Date,
        timeRange: CalendarNS.ITimeRangeFormat,
        dragNode: HTMLDivElement
    ) => void;
    draggingDate?: Date;
}

export interface ISingleDayColumnState {
    dragStatus?: CalendarNS.TCalEventPopDragStatusType;
    triggerTiming: CalendarNS.ITimingFormat;
    draggingTimeRange: CalendarNS.ITimeRangeFormat;
}

const mapStateToProps = state => ({ locale: state.layoutReducers.locale });

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
        const { value, draggingDate, definerCalEvtSignal } = this.props;
        const { dragStatus } = this.state;
        if (
            // handle weekLayout case: cancel dragging when drag on other ones
            draggingDate &&
            isSameDay(value, draggingDate) === false &&
            dragStatus === 'holdon'
        ) {
            this.cancelDragging();
        }

        // if (
        //     prevProps.definerCalEvtSignal === true &&
        //     definerCalEvtSignal === false
        // ) {
        //     this.cancelDragging();
        // }
        // // handle global create case
        // if (
        //     prevProps.definerCalEvtSignal === false &&
        //     definerCalEvtSignal === true
        // ) {
        //     const timing = {
        //         dayAt: value,
        //         hourAt: new Date().getHours(),
        //         minAt: new Date().getMinutes(),
        //     };
        //     this.handleOnMouseClick(getTimeRange(timing, timing, hourSplitter));
        // }
    }

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
        console.log('cancel dragging' + this.props.value);
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
        const { value } = this.props;

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

        return (
            <div
                ref={this.colRef}
                className="calbody-content-singleDayCol-container"
            >
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
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectIntl(SingleDayColumn));
