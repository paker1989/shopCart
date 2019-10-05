import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as PopActionCreator from '../../../../store/action/popAction';
import CalEventDefinerManager from '../../../common/calEventDefiner';
import { DayConverter } from '../../../../utils/i18nProvider';
import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import getTimelineLabels from '../../../../utils/getTimelineLabels';

import { CalendarNS } from '../../../../utils/types';
import { CalendarRedux } from '../../../../utils/reduxTypes';

import './dayLayout.scss';

export interface IDayLayoutProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
    currentDate: Date;
    updateDefPop?: (defPop: CalendarRedux.IDefinerPopStats) => any;
}

export interface IDayLayoutState {}

const mapStateToProps = state => ({
    currentDate: state.dateReducers.currentDate,
});

const mapDispatchToProps = dispatch => ({
    updateDefPop: defPop => dispatch(PopActionCreator.updateDefinerPop(defPop)),
});

class DayLayout extends React.Component<IDayLayoutProps, IDayLayoutState> {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevprops: IDayLayoutProps) {}

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
        const { singleDayHeader, currentDate } = this.props;

        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        const timeLineLabels = getTimelineLabels(true);
        const headerProps = this.populateHeaderProps(currentDate);

        return (
            <div className="calbody-content-dayLayout-container">
                <div className="calbody-content-dayLayout-container__headerWrapper">
                    <div className="calbody-content-dayLayout-container__headerDifferWrapper">
                        {
                            <DateDisplayHeader
                                {...headerProps}
                                textAlign="left"
                            />
                        }
                    </div>
                </div>
                <div className="calbody-content-dayLayout-container__main">
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
