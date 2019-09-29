import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import CalEventDefinerManager from '../../../common/calEventDefiner';
import CalEventDefinerPop from '../../../common/calEventDefiner/calEventDefinerPop';
import { DayConverter } from '../../../../utils/i18nProvider';
import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import Position from '../../../common/position';
import getTimelineLabels from '../../../../utils/getTimelineLabels';
import { CalendarNS } from '../../../../utils/types';

import './dayLayout.scss';

export interface IDayLayoutProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
    currentDate: Date;
    definerCalEvtSignal?: boolean;
}

export interface IDayLayoutState
    extends CalendarNS.ICalDefinerControllerState {}

const mapStateToProps = state => ({
    currentDate: state.dateReducers.currentDate,
    definerCalEvtSignal: state.dateReducers.definerCalEvtSignal,
});

class DayLayout extends React.Component<IDayLayoutProps, IDayLayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            showDefinerPop: false,
            timeRange: null,
            dragNode: null,
            definerPopId: null,
        };
    }

    componentDidUpdate(prevprops: IDayLayoutProps) {
        if (prevprops.definerCalEvtSignal && !this.props.definerCalEvtSignal) {
            this.cancelPresenter();
        }
    }

    cancelPresenter = () => {
        this.setState({
            showDefinerPop: false,
            timeRange: null,
            dragNode: null,
            definerPopId: null,
        });
    };

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
        this.setState({
            showDefinerPop: true,
            timeRange,
            dragNode,
            definerPopId: CalEventDefinerManager.getId(), // force to rajustPosition
        });
    };

    render() {
        const {
            singleDayHeader,
            currentDate,
            definerCalEvtSignal,
        } = this.props;
        const {
            showDefinerPop,
            timeRange,
            dragNode,
            definerPopId,
        } = this.state;

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
                                definerCalEvtSignal={definerCalEvtSignal}
                            />
                        </div>
                    </div>
                </div>
                {showDefinerPop && (
                    <CalEventDefinerPop
                        timeRange={timeRange}
                        positionner={Position.autoMiddle}
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

export default connect(mapStateToProps)(DayLayout);
