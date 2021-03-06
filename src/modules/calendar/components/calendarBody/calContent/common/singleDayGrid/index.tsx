import * as React from 'react';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { CalendarNS } from '../../../../../utils/types';
import { getYYYYMMDDDate } from '../../../../../utils/timeUtils';
import CalDaySimpleEvtList from '../../../../common/calDayEvtPresenter/calDaySimpleEvtList';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';
import WindowEventHandler from '../../../../../../../_packages_/utils/components/windowEventHandler';
import WindowResizeHandler from '../../../../../../../_packages_/utils/components/windowResizeHandler';

import './singleDayGrid.scss';
import { getPath } from '../../../../../utils/routeHelper';

const mapStateToProps = (state, ownProps) => ({
    evts: state.evtsReducers.cachedEvts[getYYYYMMDDDate(ownProps.value)],
    locale: state.layoutReducers.locale,
});

export interface ISingleDayGridProps extends CalendarNS.IMonthCalEventProps {
    className?: string;
    showValue: string | number;
    value: Date;
    isGrey?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    isDisable?: boolean;
    onSelect?: CalendarNS.FnDateGridSelect;
    setDateRangeRef?: (
        ref: React.RefObject<HTMLDivElement>,
        type: 'start' | 'end'
    ) => void;
    onMouseEventChange?: CalendarNS.FnOnDaySplitter;
    evts?: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    history?: any;
    locale?: string;
}

const _test_calEventBody_bg = 'rgb(121, 134, 203)';

/**
 * @description for month layout use
 */
class SingleDayGrid extends React.Component<ISingleDayGridProps, any> {
    static defaultProps = {
        isSelected: false,
        isDisable: false,
    };
    private dragRef: React.RefObject<HTMLDivElement>;

    private self: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.dragRef = React.createRef();
        this.self = React.createRef();
        this.state = { evtsContainerHeight: null };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setContainerHeight();
        }, 0);
    }

    componentDidUpdate() {
        const { isInvolved, isStart, isEnd, setDateRangeRef } = this.props;
        if (!this.dragRef || !isInvolved || !setDateRangeRef) {
            return;
        }
        if (isStart) {
            setDateRangeRef(this.dragRef, 'start');
        }
        if (isEnd) {
            setDateRangeRef(this.dragRef, 'end');
        }
    }

    handleDefineEvent = (
        evt: React.MouseEvent<HTMLDivElement>,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { value, onMouseEventChange } = this.props;
        onMouseEventChange && onMouseEventChange(value, eventType);
    };

    setContainerHeight = throttle(() => {
        if (!this.self || !this.self.current) {
            return;
        }
        const { bottom, top } = this.self.current.getBoundingClientRect();
        this.setState({
            evtsContainerHeight: Math.floor(bottom - top - 28),
        });
    }, 500);

    goToDate = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        evt.nativeEvent.stopPropagation();
        const { history, locale, value } = this.props;
        history.push(getPath(value, { layout: 'day', lang: locale }));
    };

    render() {
        const {
            evts,
            showValue,
            isToday,
            isGrey,
            isDisable,
            isSelected,
            isInvolved,
            isWeekStart,
            isEnd,
            isStart,
            value,
        } = this.props;
        const { evtsContainerHeight } = this.state;

        const showValueClass = cx({
            ['singleday-grid-container-showValue']: true,
            ['is-today']: isToday,
            ['is-grey']: isGrey,
            ['is-disable']: isDisable,
            ['is-selected']: isSelected,
        });

        const calEventPopEventClass = cx({
            ['singleday-grid-container-calEvent']: isInvolved,
            ['is-start']: isWeekStart || isStart,
            ['is-end']: isEnd,
        });

        const calEventBodyStyle: React.CSSProperties = {
            background: _test_calEventBody_bg,
        };

        return (
            <div
                ref={this.self}
                className="singleday-grid-container"
                onMouseDown={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'mousedown');
                }}
                onMouseEnter={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'mouseenter');
                }}
                onMouseUp={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'mouseup');
                }}
                onClick={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'click');
                }}
            >
                <div className={showValueClass}>
                    <div className="showValue__base" onMouseDown={this.goToDate}>
                        <span>{showValue}</span>
                    </div>
                </div>
                {evts && (
                    <div className="evts-present-wrapper">
                        <CalDaySimpleEvtList
                            seletedDate={value}
                            evts={evts}
                            containerHeight={evtsContainerHeight}
                        />
                    </div>
                )}
                {isInvolved && (
                    <div ref={this.dragRef} className={calEventPopEventClass}>
                        <div
                            className="calEvent__body"
                            style={calEventBodyStyle}
                        >
                            {(isStart || isWeekStart) && (
                                <span className="singleday-grid-container-calEvent__title">
                                    <FormattedMessage id="cal.noTitle" />
                                </span>
                            )}
                        </div>
                    </div>
                )}
                <WindowResizeHandler onResize={this.setContainerHeight} />
                <WindowEventHandler
                    eventName="scroll"
                    callbackFn={this.setContainerHeight}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(SingleDayGrid));
