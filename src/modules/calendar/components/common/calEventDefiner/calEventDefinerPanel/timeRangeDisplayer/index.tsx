import * as React from 'react';
import cx from 'classnames';
import { IntlShape, injectIntl } from 'react-intl';

import { CalendarNS } from '../../../../../utils/types';
import { getTimingDisplay } from '../../../../../utils/timeRangeHelper';
import CalDatePicker from './calDatePicker';

import './timeRangeDisplayer.scss';

export interface ITimeRangeDisplayerProps {
    time: CalendarNS.ITimeRangeFormat;
    isReminder?: boolean;
    isWholeDayEvt?: boolean;
    intl: IntlShape;
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
        const { time, isReminder, isWholeDayEvt, intl } = this.props;
        const dayFromShowValue = intl.formatDate(time.from.dayAt, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
        const dayToShowValue = intl.formatDate(time.to.dayAt, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });

        let timeRangeBody = (
            <div className="timeRange-diplayer-body">
                <div className="timeRange-diplayer-part">
                    {/* <span>{getFormattedDate(time.from.dayAt, 'literal')}</span> */}
                    <CalDatePicker
                        value={time.from.dayAt}
                        showValue={dayFromShowValue}
                    />
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
                        {/* <span>{getFormattedDate(time.to.dayAt, 'literal')}</span> */}
                        <CalDatePicker
                            value={time.to.dayAt}
                            showValue={dayToShowValue}
                        />
                    </div>
                )}
            </div>
        );

        return <div className="timeRange-diplayer">{timeRangeBody}</div>;
    }
}

export default injectIntl(TimeRangeDisplayer);
