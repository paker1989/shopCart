import * as React from 'react';
import cx from 'classnames';

import { CalendarNS } from '../../../../../utils/types';
import { getTimingDisplay } from '../../../../../utils/timeRangeHelper';
import { getFormattedDate } from '../../../../../../../_packages_/components/datePicker/common/util';
import './timeRangeDisplayer.scss';

export interface ITimeRangeDisplayerProps {
    time: CalendarNS.TtimeDisplaySupportType;
    isReminder?: boolean;
    
}
class TimeRangeDisplayer extends React.Component<
    ITimeRangeDisplayerProps,
    any
> {
    static defaultProps = {
        isReminder: false,
    };
    render() {
        const { time, isReminder } = this.props;

        let timeRangeBody;

        if ((time as CalendarNS.IDateRangeFormat).from.getDate) {
            const dateRange = time as CalendarNS.IDateRangeFormat;
            timeRangeBody = (
                <div className="timeRange-diplayer-body">
                    <div className="timeRange-diplayer-part">
                        <span>
                            {getFormattedDate(dateRange.from, '年月日')}
                        </span>
                    </div>
                    {!isReminder && <span>-</span>}
                    {!isReminder && (
                        <div className="timeRange-diplayer-part">
                            <span>
                                {getFormattedDate(dateRange.to, '年月日')}
                            </span>
                        </div>
                    )}
                </div>
            );
        } else if ((time as CalendarNS.ITimeRangeFormat).from.dayAt) {
            const timeRange = time as CalendarNS.ITimeRangeFormat;
            timeRangeBody = (
                <div className="timeRange-diplayer-body">
                    <div className="timeRange-diplayer-part">
                        <span>
                            {getFormattedDate(timeRange.from.dayAt, '年月日')}
                        </span>
                        <span>{getTimingDisplay(timeRange.from, '12h')}</span>
                    </div>
                    {!isReminder && <span>-</span>}
                    {!isReminder && (
                        <div className="timeRange-diplayer-part">
                            <span>{getTimingDisplay(timeRange.to, '12h')}</span>
                            <span>
                                {getFormattedDate(timeRange.to.dayAt, '年月日')}
                            </span>
                        </div>
                    )}
                </div>
            );
        }
        //  else {
        //     const timeRange = time as CalendarNS.ITimingFormat;
        //     timeRangeBody = (
        //         <div className="timeRange-diplayer-body">
        //             <div className="timeRange-diplayer-part">
        //                 <span>
        //                     {getFormattedDate(timeRange.dayAt, '年月日')}
        //                 </span>
        //                 <span>{getTimingDisplay(timeRange)}</span>
        //             </div>
        //         </div>
        //     );
        // }

        return <div className="timeRange-diplayer">{timeRangeBody}</div>;
    }
}

export default TimeRangeDisplayer;
