import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as PopActionCreator from '../../../../store/action/popAction';
import * as EvtsActionCreator from '../../../../store/action/evtsAction';
import CalEventDefinerManager from '../../../common/calEventDefiner';
import { DayConverter } from '../../../../utils/i18nProvider';
import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import { getDayRangeOfWeek } from '../../../../utils/timeUtils';
import getTimelineLabels from '../../../../utils/getTimelineLabels';
import CalConfig from '../../../../assets/scripts/calendar.config';
import { CalendarNS } from '../../../../utils/types';
import { CalendarRedux } from '../../../../utils/reduxTypes';
import Placeholder from '../common/singleDayHeaderPlder';
import { getPath } from '../../../../utils/routeHelper';

import './weekLayout.scss';

export interface IWeekLayoutProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
    currentDate: Date;
    currentWeek: number;
    currentMonth: number;
    currentYear: number;
    history?: any;
    locale?: string;
    updateDefPop?: (defPop: CalendarRedux.IDefinerPopStats) => any;
    fetchEvts?: (dates: Date[]) => void;
}

export interface IWeekLayoutState {
    draggingDate?: Date;
    collapseEvt: boolean;
    datesOfWeek: Date[];
    nbMaxChildEvts: number;
}

const mapStateToProps = state => {
    return {
        currentWeek: state.dateReducers.currentWeek,
        currentDate: state.dateReducers.currentDate,
        currentMonth: state.dateReducers.currentMonth,
        currentYear: state.dateReducers.currentYear,
        locale: state.layoutReducers.locale,
    };
};

const mapDispatchToProps = dispatch => ({
    updateDefPop: defPop => dispatch(PopActionCreator.updateDefinerPop(defPop)),
    fetchEvts: (dates: Date[]) =>
        dispatch(EvtsActionCreator.fetchEvtsOfDates(dates)),
});

const _is_display_we = true;

class WeekLayout extends React.Component<IWeekLayoutProps, IWeekLayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            draggingDate: null,
            collapseEvt: false,
            datesOfWeek: [],
            nbMaxChildEvts: 0,
        };
    }

    componentDidMount() {
        const { currentYear, currentWeek, fetchEvts } = this.props;
        this.populateDatesOfWeek(currentYear, currentWeek, _is_display_we);
    }

    componentDidUpdate(prevProps) {
        const { currentYear, currentWeek } = this.props;
        if (
            currentYear !== prevProps.currentYear ||
            currentWeek !== prevProps.currentWeek
        ) {
            this.populateDatesOfWeek(currentYear, currentWeek, _is_display_we);
        }
    }

    populateDatesOfWeek(currentYear, currentWeek, isDisplayWE) {
        const { fetchEvts } = this.props;
        this.setState(
            {
                datesOfWeek: getDayRangeOfWeek(
                    currentYear,
                    currentWeek,
                    isDisplayWE
                ),
            },
            () => {
                fetchEvts(this.state.datesOfWeek);
            }
        );
    }

    populateHeaderProps = (dates: Date[]): any[] => {
        const headerProps = dates.map(date => ({
            dayAt: <FormattedMessage id={DayConverter[date.getDay()]} />,
            cnCalendarNb: '初三',
            date,
        }));

        return headerProps;
    };

    navToSelectedDate = (date: Date): void => {
        const { history, locale } = this.props;
        history.push(getPath(date, { layout: 'day', lang: locale }));
    };

    initDefiner = (
        draggingDate: Date,
        timeRange: CalendarNS.ITimeRangeFormat,
        dragNode: HTMLDivElement
    ): void => {
        this.setState({
            draggingDate,
        });
        CalEventDefinerManager.setCurrentDragNode(dragNode);
        this.props.updateDefPop({
            defShowPop: true,
            defTimeRange: timeRange,
            defPopId: CalEventDefinerManager.getId(),
            defPositionner: 'autoAside',
            defAsideCurshion: 10,
            defTopCurshion: 30,
            defBottomCurshion: 50,
        });
    };

    updateNbEvts = (nbEvts: number) => {
        const { nbMaxChildEvts } = this.state;
        if (nbEvts > nbMaxChildEvts) {
            this.setState({
                nbMaxChildEvts: nbEvts,
            });
        }
    };

    getHeaders = (headerProps, itemWidth) => {
        const { singleDayHeader } = this.props;
        const { collapseEvt, nbMaxChildEvts } = this.state;
        const nbMaxDisplayEvts = CalConfig.maxHeaderDisplayEvt;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        return (
            <div className="calbody-content-weekLayout-container__headerWrapper">
                <Placeholder
                    maxNbEvts={nbMaxDisplayEvts}
                    isCollapse={collapseEvt}
                    nbEvts={nbMaxChildEvts}
                    onExpOrClps={() => {
                        this.setState({ collapseEvt: !collapseEvt });
                    }}
                />
                {headerProps.map((headerProps, index) => (
                    <div
                        className="calbody-content-weekLayout-container__headerDifferWrapper"
                        style={{ width: `${itemWidth}%` }}
                        key={`headGridWrapper-${index}`}
                    >
                        {
                            <DateDisplayHeader
                                {...headerProps}
                                textAlign="center"
                                onClick={this.navToSelectedDate}
                                nbDisplayEvts={
                                    collapseEvt ? nbMaxDisplayEvts : -1
                                }
                                updateNbEvts={this.updateNbEvts}
                            />
                        }
                    </div>
                ))}
            </div>
        );
    };

    render() {
        const { draggingDate, datesOfWeek } = this.state;

        const timeLineLabels = getTimelineLabels(true);

        const headerProps = this.populateHeaderProps(datesOfWeek);
        const itemWidth = 100 / headerProps.length;
        const Header = this.getHeaders(headerProps, itemWidth);

        return (
            <div className="calbody-content-weekLayout-container">
                {Header}
                <div className="calbody-content-weekLayout-container__main">
                    <div className="calbody-content-weekLayout-container__timeline">
                        {timeLineLabels.map((label, index) => (
                            <div
                                className="calbody-content-weekLayout-container__timelineGrid"
                                key={`timelineLabels-${index}`}
                            >
                                <span className="timelineLabel__text font-subtitle">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="calbody-content-weekLayout-container__placeholderLine">
                        {timeLineLabels.map((label, index) => (
                            <div
                                className="calbody-content-weekLayout-container__timelineGrid"
                                key={`placeholderGrid-${index}`}
                            />
                        ))}
                    </div>
                    <div className="calbody-content-weekLayout-container__columnbody">
                        {datesOfWeek.map((date, index) => {
                            return (
                                <div
                                    className="calbody-content-weekLayout-container__dayDifferWrapper"
                                    style={{
                                        width: `${itemWidth}%`,
                                    }}
                                    key={`dateColWrapper-${index}`}
                                >
                                    <SingleDayColumn
                                        initDefiner={this.initDefiner}
                                        value={date}
                                        draggingDate={draggingDate}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(WeekLayout));
