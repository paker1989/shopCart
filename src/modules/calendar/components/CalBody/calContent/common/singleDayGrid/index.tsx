import * as React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { CalendarNS } from '../../../../../utils/types';
import { getYYYYMMDDDate } from '../../../../../utils/timeUtils';
import CalDaySimpleEvtList from '../../../../common/calDayEvtPresenter/calDaySimpleEvtList';

import './singleDayGrid.scss';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';

const mapStateToProps = (state, ownProps) => ({
    evts: state.evtsReducers.cachedEvts[getYYYYMMDDDate(ownProps.value)],
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

    constructor(props) {
        super(props);
        this.dragRef = React.createRef();
    }

    componentDidUpdate() {
        console.log(this.props.evts);
        console.log(this.props);
        if (this.props.evts) {
            console.log(this.props.evts);
        }
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
        } = this.props;

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
                    <div className="showValue__base">
                        <span>{showValue}</span>
                    </div>
                </div>
                {evts && (
                    <div className="evts-present-wrapper">
                        <CalDaySimpleEvtList evts={evts} maxPreview={2} />
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
            </div>
        );
    }
}

export default connect(mapStateToProps)(SingleDayGrid);
