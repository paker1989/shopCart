import * as React from 'react';

import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import './dayLayout.scss';

import { CalendarNS } from '../../../../utils/types';

export interface ISingleDayColumnProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
}

const _test_header_props = {
    dayAt: '周日',
    cnCalendarNb: '初三',
    dateNumber: 1,
};

class DayLayout extends React.Component<ISingleDayColumnProps, any> {
    render() {
        const { singleDayHeader } = this.props;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;

        return (
            <div className="calbody-content-dayLayout-container">
                <div className="calbody-content-dayLayout-container__timeline">
                </div>
                <div className="calbody-content-dayLayout-container__main">
                    <DateDisplayHeader {..._test_header_props} />
                    <div className="calbody-content-dayLayout-container__columnbody">
                        <SingleDayColumn />
                    </div>
                </div>
            </div>
        );
    }
}

export default DayLayout;
