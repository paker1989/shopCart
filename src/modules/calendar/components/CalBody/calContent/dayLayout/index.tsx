import * as React from 'react';
import { connect } from 'react-redux';
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
    currentDate: Date;
    definerCalEvtSignal?: boolean;
}

const mapStateToProps = state => ({
    currentDate: state.dateReducers.currentDate,
    definerCalEvtSignal: state.dateReducers.definerCalEvtSignal,
});

class DayLayout extends React.Component<IDayLayoutProps, any> {

    populateHeaderProps = (date: Date) => {
        const headerProps = {
            dayAt: <FormattedMessage id={DayConverter[date.getDay()]} />,
            cnCalendarNb: '初三',
            date,
        };
        return headerProps;
    };

    render() {
        const { singleDayHeader, currentDate, definerCalEvtSignal } = this.props;
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
                                value={currentDate}
                                topCurshion={30}
                                bottomCurshion={50}
                                definerCalEvtSignal={definerCalEvtSignal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(DayLayout);
