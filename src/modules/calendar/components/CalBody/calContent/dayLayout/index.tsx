import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { DayConverter } from '../../../../utils/i18nProvider';
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

const _test_date_ = new Date('2019-01-02');

class DayLayout extends React.Component<IDayLayoutProps, any> {
    populateHeaderProps = (date: Date) => {
        const headerProps = {
            dayAt: <FormattedMessage id={DayConverter[date.getDay()]} />,
            cnCalendarNb: '初三',
            dateNumber: date.getDate(),
        };
        return headerProps;
    };

    render() {
        const { singleDayHeader } = this.props;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        const timeLineLabels = getTimelineLabels(true);

        const headerProps = this.populateHeaderProps(_test_date_);

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
                                value={_test_date_}
                                topCurshion={30}
                                bottomCurshion={50}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DayLayout;
