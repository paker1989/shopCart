import * as React from 'react';
import { IntlShape, injectIntl } from 'react-intl';

import { CalendarNS } from '../../../../../utils/types';
import { getTimingDisplay } from '../../../../../utils/timeRangeHelper';
import CalDatePicker from './calDatePicker';
import CalTimingPicker from './calTimingPicker';

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

    selectDate = (actionType: 'from' | 'to', val: Date): void => {
      console.log('actionType = ' + actionType);
      console.log(val);
    }

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
                        onSelect={this.selectDate.bind(this, 'from')}
                        value={time.from.dayAt}
                        showValue={dayFromShowValue}
                    />
                    {!isWholeDayEvt && (
                        // <span>{getTimingDisplay(time.from, '12h')}</span>
                        <CalTimingPicker timing={time.from} pattern='12h' />
                    )}
                </div>
                {!isReminder && <span>-</span>}
                {!isReminder && (
                    <div className="timeRange-diplayer-part">
                        {!isWholeDayEvt && (
                            // <span>{getTimingDisplay(time.to, '12h')}</span>
                            <CalTimingPicker timing={time.to} pattern='12h' />
                        )}
                        {/* <span>{getFormattedDate(time.to.dayAt, 'literal')}</span> */}
                        <CalDatePicker
                            value={time.to.dayAt}
                            showValue={dayToShowValue}
                            onSelect={this.selectDate.bind(this, 'from')}
                        />
                    </div>
                )}
            </div>
        );

        return <div className="timeRange-diplayer">{timeRangeBody}</div>;
    }
}

export default injectIntl(TimeRangeDisplayer);
