import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { DayConverter } from '../../../../utils/i18nProvider';
import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import CalEventDefiner from '../../../common/calEventDefiner';

import { getDayRangeOfWeek } from '../../../../utils/timeUtils';
import getTimelineLabels from '../../../../utils/getTimelineLabels';

import { CalendarNS } from '../../../../utils/types';

import './weekLayout.scss';

export interface IWeekLayoutProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
}

export interface IWeekLayoutStat {
    draggingDate?: Date;
}

const _test_year_ = 2019;
const _test_week_ = 22;
const _is_display_we = true;

const daysOfWeek = getDayRangeOfWeek(_test_year_, _test_week_, _is_display_we);

class WeekLayout extends React.Component<IWeekLayoutProps, any> {
    constructor(props) {
        super(props);
        this.state = { draggingDate: null };
    }

    handleInitDragging = (draggingDate: Date) => {
        if (draggingDate !== null) {
            this.setState({ draggingDate });
        }
    };

    populateHeaderProps = (dates: Date[]): any[] => {
        const headerProps = dates.map(date => ({
            dayAt: <FormattedMessage id={DayConverter[date.getDay()]} />,
            cnCalendarNb: '初三',
            dateNumber: date.getDate(),
        }));

        return headerProps;
    };

    render() {
        const { singleDayHeader } = this.props;
        const { draggingDate } = this.state;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        const timeLineLabels = getTimelineLabels(true);
        const headerProps = this.populateHeaderProps(daysOfWeek);
        const itemWidth = 100 / headerProps.length;
        return (
            <div className="calbody-content-weekLayout-container">
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
                                />
                            }
                        </div>
                    ))}
                </div>
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
                        {daysOfWeek.map((date, index) => (
                            <div
                                className="calbody-content-weekLayout-container__dayDifferWrapper"
                                style={{
                                    width: `${itemWidth}%`,
                                }}
                                key={`dateColWrapper-${index}`}
                            >
                                <SingleDayColumn
                                    value={date}
                                    draggingDate={draggingDate}
                                    onInitDragging={this.handleInitDragging}
                                    positionner={
                                        CalEventDefiner.Position.autoAside
                                    }
                                    asideCurshion={10}
                                    bottomCurshion={50}
                                    topCurshion={30}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default WeekLayout;
