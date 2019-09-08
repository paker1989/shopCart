import * as React from 'react';

import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import './dayLayout.scss';

import getTimelineLabels from '../../../../utils/getTimelineLabels';
import { CalendarNS } from '../../../../utils/types';

export interface IDayLayoutProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
}

const _test_header_props = {
    dayAt: '周日',
    cnCalendarNb: '初三',
    dateNumber: 1,
};

const _test_date_ = new Date('2019-01-02');

class DayLayout extends React.Component<IDayLayoutProps, any> {
    render() {
        const { singleDayHeader } = this.props;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        const timeLineLabels = getTimelineLabels(true);

        return (
            <div className="calbody-content-dayLayout-container">
                <div className="calbody-content-dayLayout-container__headerWrapper">
                    <div className="calbody-content-dayLayout-container__headerDifferWrapper">
                        {
                            <DateDisplayHeader
                                {..._test_header_props}
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
                            <SingleDayColumn value={_test_date_} topCurshion={30} bottomCurshion={50} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DayLayout;
