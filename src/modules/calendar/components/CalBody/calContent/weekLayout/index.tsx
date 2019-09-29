import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import CalEventDefinerManager from '../../../common/calEventDefiner';
import { DayConverter } from '../../../../utils/i18nProvider';
import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import CalEventDefinerPop from '../../../common/calEventDefiner/calEventDefinerPop';
import Position from '../../../common/position';
import { getDayRangeOfWeek } from '../../../../utils/timeUtils';
import getTimelineLabels from '../../../../utils/getTimelineLabels';

import { CalendarNS } from '../../../../utils/types';

import {
    isSameDay,
    isIncludeDate,
} from '../../../../../../_packages_/components/datePicker/common/util';
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
    definerCalEvtSignal?: boolean;
    history?: any;
    locale?: string;
}

export interface IWeekLayoutState
    extends CalendarNS.ICalDefinerControllerState {
    draggingDate?: Date;
}

const mapStateToProps = state => {
    return {
        currentWeek: state.dateReducers.currentWeek,
        currentDate: state.dateReducers.currentDate,
        currentMonth: state.dateReducers.currentMonth,
        currentYear: state.dateReducers.currentYear,
        definerCalEvtSignal: state.dateReducers.definerCalEvtSignal,
        locale: state.layoutReducers.locale,
    };
};
const _is_display_we = true;

class WeekLayout extends React.Component<IWeekLayoutProps, IWeekLayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            draggingDate: null,
            showDefinerPop: false,
            timeRange: null,
            dragNode: null,
            definerPopId: null,
        };
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
            showDefinerPop: true,
            timeRange,
            dragNode,
            definerPopId: CalEventDefinerManager.getId(), // force to rajustPosition
        });
    };

    getHeaders = (headerProps, itemWidth) => {
        const { singleDayHeader } = this.props;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        return (
            <div className="calbody-content-weekLayout-container__headerWrapper">
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
                            />
                        }
                    </div>
                ))}
            </div>
        );
    };

    render() {
        const { currentYear, currentWeek, definerCalEvtSignal } = this.props;
        const {
            draggingDate,
            showDefinerPop,
            timeRange,
            dragNode,
            definerPopId,
        } = this.state;

        const timeLineLabels = getTimelineLabels(true);
        const daysOfWeek = getDayRangeOfWeek(
            currentYear,
            currentWeek,
            _is_display_we
        );
        const dateToListenToSingal = isIncludeDate(daysOfWeek, new Date())
            ? new Date()
            : daysOfWeek[0];
        const headerProps = this.populateHeaderProps(daysOfWeek);
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
                        {daysOfWeek.map((date, index) => {
                            const signalValue = isSameDay(
                                date,
                                dateToListenToSingal
                            )
                                ? definerCalEvtSignal
                                : null;
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
                                        definerCalEvtSignal={signalValue}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {showDefinerPop && (
                    <CalEventDefinerPop
                        timeRange={timeRange}
                        positionner={Position.autoAside}
                        asideCurshion={10}
                        topCurshion={30}
                        bottomCurshion={50}
                        dragPopNode={dragNode}
                        id={definerPopId}
                    />
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(WeekLayout));
