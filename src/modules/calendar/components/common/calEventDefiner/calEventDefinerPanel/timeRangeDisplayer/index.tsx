import * as React from 'react';
import cx from 'classnames';

import { CalendarNS } from '../../../../../utils/types';
import { getTimingDisplay } from '../../../../../utils/timeRangeHelper';
import { getFormattedDate } from '../../../../../../../_packages_/components/datePicker/common/util';
import './timeRangeDisplayer.scss';

export interface ITimeRangeDisplayerProps {
    time: CalendarNS.ITimeRangeFormat;
    isReminder?: boolean;
    isWholeDayEvt?: boolean;
}
class TimeRangeDisplayer extends React.Component<
    ITimeRangeDisplayerProps,
    any
> {
    static defaultProps = {
        isReminder: false,
        isWholeDayEvt: false,
    };
    render() {
        const { time, isReminder, isWholeDayEvt } = this.props;
        let timeRangeBody = (
            <div className="timeRange-diplayer-body">
                <div className="timeRange-diplayer-part">
                    <span>{getFormattedDate(time.from.dayAt, 'literal')}</span>
                    {!isWholeDayEvt && (
                        <span>{getTimingDisplay(time.from, '12h')}</span>
                    )}
                </div>
                {!isReminder && <span>-</span>}
                {!isReminder && (
                    <div className="timeRange-diplayer-part">
                        {!isWholeDayEvt && (
                            <span>{getTimingDisplay(time.to, '12h')}</span>
                        )}
                        <span>{getFormattedDate(time.to.dayAt, 'literal')}</span>
                    </div>
                )}
            </div>
        );

        return <div className="timeRange-diplayer">{timeRangeBody}</div>;
    }
}

export default TimeRangeDisplayer;
