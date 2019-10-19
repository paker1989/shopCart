import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as PopActionCreator from '../../../../store/action/popAction';
import * as EvtsActionCreator from '../../../../store/action/evtsAction';
import CalEventDefinerManager from '../../../common/calEventDefiner';
import { DayConverter } from '../../../../utils/i18nProvider';
import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import getTimelineLabels from '../../../../utils/getTimelineLabels';
import Placeholder from '../common/singleDayHeaderPlder';
import CalConfig from '../../../../assets/scripts/calendar.config';
import { CalendarNS } from '../../../../utils/types';
import { CalendarRedux } from '../../../../utils/reduxTypes';
import { getYYYYMMDDDate } from '../../../../utils/timeUtils';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import { isSameDay } from '../../../../../../_packages_/components/datePicker/common/util';

import './dayLayout.scss';
import CalNowTimeline from '../../../common/calNowTimeline';

export interface IDayLayoutProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
    currentDate: Date;
    updateDefPop?: (defPop: CalendarRedux.IDefinerPopStats) => any;
    fetchEvts?: (date) => void;
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
}

export interface IDayLayoutState {
    collapseEvt: boolean;
}

const mapStateToProps = state => ({
    currentDate: state.dateReducers.currentDate,
    evts:
        state.evtsReducers.cachedEvts[
            getYYYYMMDDDate(state.dateReducers.currentDate)
        ],
});

const mapDispatchToProps = dispatch => ({
    updateDefPop: defPop => dispatch(PopActionCreator.updateDefinerPop(defPop)),
    fetchEvts: (date: Date) => dispatch(EvtsActionCreator.fetchEvts(date)),
});

class DayLayout extends React.Component<IDayLayoutProps, IDayLayoutState> {
    constructor(props) {
        super(props);
        this.state = { collapseEvt: false };
    }

    componentDidMount() {
        const { fetchEvts } = this.props;
        fetchEvts(this.props.currentDate);
    }

    componentDidUpdate(prevProps) {
        const { currentDate, fetchEvts } = this.props;
        if (isSameDay(prevProps.currentDate, currentDate) === false) {
            fetchEvts(this.props.currentDate);
        }
    }

    populateHeaderProps = (date: Date) => {
        const headerProps = {
            dayAt: <FormattedMessage id={DayConverter[date.getDay()]} />,
            cnCalendarNb: '初三',
            date,
        };
        return headerProps;
    };

    initDefiner = (
        value: Date,
        timeRange: CalendarNS.ITimeRangeFormat,
        dragNode: HTMLDivElement
    ): void => {
        CalEventDefinerManager.setCurrentDragNode(dragNode);
        this.props.updateDefPop({
            defShowPop: true,
            defTimeRange: timeRange,
            defPopId: CalEventDefinerManager.getId(),
            defPositionner: 'autoMiddle',
            defTopCurshion: 30,
            defBottomCurshion: 50,
        });
    };

    render() {
        const { singleDayHeader, currentDate, evts } = this.props;
        const { collapseEvt } = this.state;

        const nbMaxDisplayEvts = CalConfig.maxHeaderDisplayEvt;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        const timeLineLabels = getTimelineLabels(true);
        const headerProps = this.populateHeaderProps(currentDate);

        return (
            <div className="calbody-content-dayLayout-container">
                <div className="calbody-content-dayLayout-container__headerWrapper">
                    <Placeholder
                        maxNbEvts={nbMaxDisplayEvts}
                        isCollapse={collapseEvt}
                        evts={evts}
                        onExpOrClps={() => {
                            this.setState({ collapseEvt: !collapseEvt });
                        }}
                    />
                    {
                        <DateDisplayHeader
                            {...headerProps}
                            textAlign="left"
                            nbDisplayEvts={collapseEvt ? nbMaxDisplayEvts : -1}
                        />
                    }
                </div>
                <div className="calbody-content-dayLayout-container__main scrolling">
                    <div className="calbody-content-dayLayout-container__timeline">
                        {timeLineLabels.map((label, index) => (
                            <div
                                className="calbody-content-dayLayout-container__timelineGrid"
                                key={`timelineLabels-${index}`}
                            >
                                <span className="timelineLabel__text font-subtitle">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="calbody-content-dayLayout-container__placeholderLine">
                        {timeLineLabels.map((label, index) => (
                            <div
                                className="calbody-content-dayLayout-container__timelineGrid"
                                key={`placeholderGrid-${index}`}
                            />
                        ))}
                    </div>
                    <div className="calbody-content-dayLayout-container__columnbody">
                        {/* <CalNowTimeline/> */}
                        <div className="calbody-content-dayLayout-container__dayDifferWrapper">
                            <SingleDayColumn
                                initDefiner={this.initDefiner}
                                value={currentDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DayLayout);
