import * as React from 'react';

import SingleDayColumn from '../common/singleDayColumn';
import DefaultHeader from '../common/singleDayHeader';
import './columnLayout.scss';

import getTimelineLabels from '../../../../utils/getTimelineLabels';
import { CalendarNS } from '../../../../utils/types';

export interface ISingleDayColumnProps {
    singleDayHeader?: React.ComponentType<
        CalendarNS.ISingleDayDefaultHeaderProps
    >;
}

const _test_headers_props = [
    { dayAt: '周日', cnCalendarNb: '初三', dateNumber: 1 },
    { dayAt: '周一', cnCalendarNb: '初四', dateNumber: 2 },
    { dayAt: '周二', cnCalendarNb: '初五', dateNumber: 3 },
    { dayAt: '周三', cnCalendarNb: '初六', dateNumber: 4 },
    { dayAt: '周四', cnCalendarNb: '初七', dateNumber: 5 },
    { dayAt: '周五', cnCalendarNb: '初八', dateNumber: 6 },
    { dayAt: '周六', cnCalendarNb: '初九', dateNumber: 7 },
];
const _test_headers_nb = _test_headers_props.length;
const _is_single_day = _test_headers_nb === 1;

class ColumnLayout extends React.Component<ISingleDayColumnProps, any> {
    render() {
        const { singleDayHeader } = this.props;
        const DateDisplayHeader = singleDayHeader || DefaultHeader;
        const timeLineLabels = getTimelineLabels(true);

        return (
            <div className="calbody-content-columnLayout-container">
                <div className="calbody-content-columnLayout-container__headerWrapper">
                    {_test_headers_props.map((headerProps, index) => (
                        <div
                            className="calbody-content-columnLayout-container__headerDifferWrapper"
                            style={{ width: `${100 / _test_headers_nb}%` }}
                            key={`headGridWrapper-${index}`}
                        >
                            {
                                <DateDisplayHeader
                                    {...headerProps}
                                    textAlign={
                                        _is_single_day ? 'left' : 'center'
                                    }
                                />
                            }
                        </div>
                    ))}
                </div>
                <div className="calbody-content-columnLayout-container__main">
                    <div className="calbody-content-columnLayout-container__timeline">
                        {timeLineLabels.map((label, index) => (
                            <div
                                className="calbody-content-columnLayout-container__timelineGrid"
                                key={`timelineLabels-${index}`}
                            >
                                <span className="timelineLabel__text font-subtitle">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="calbody-content-columnLayout-container__placeholderLine">
                        {timeLineLabels.map((label, index) => (
                            <div
                                className="calbody-content-columnLayout-container__timelineGrid"
                                key={`placeholderGrid-${index}`}
                            />
                        ))}
                    </div>
                    <div className="calbody-content-columnLayout-container__columnbody">
                        {_test_headers_props.map((headerProps, index) => (
                            <div
                                className="calbody-content-columnLayout-container__dayDifferWrapper"
                                style={{
                                    width: `${100 / _test_headers_nb}%`,
                                }}
                                key={`dateColWrapper-${index}`}
                            >
                                <SingleDayColumn />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ColumnLayout;
