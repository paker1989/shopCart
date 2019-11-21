import * as React from 'react';
import { IntlShape, injectIntl } from 'react-intl';

import { CalendarNS } from '../../../../../utils/types';
import CalDatePicker from './calDatePicker';
import CalTimingPicker from './calTimingPicker';

import './timeRangeDisplayer.scss';
import {
    convertMinAddToDate,
    convertDateToITimingFormat,
    convertTimeFormatToDate,
} from '../../../../../utils/timeRangeHelper';

export interface ITimeRangeDisplayerProps {
    time: CalendarNS.ITimeRangeFormat;
    isReminder?: boolean;
    isWholeDayEvt?: boolean;
    intl: IntlShape;
    onChange: (field: string, value: any) => void;
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
        const { onChange } = this.props;
        switch (actionType) {
            case 'from':
                onChange('fromDate', val);
                break;
            case 'to':
                onChange('toDate', val);
        }
    };

    selectTiming = (
        actionType: 'from' | 'to',
        val: CalendarNS.ITimingFormat
    ): void => {
        const { onChange } = this.props;
        switch (actionType) {
            case 'from':
                onChange('fromTiming', val);
                break;
            case 'to':
                onChange('toTiming', val);
        }
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

        const fromTimingRef: CalendarNS.ITimingFormat = {
            dayAt: time.from.dayAt,
            hourAt: 0,
            minAt: 0,
        };

        const toTimingRef = convertDateToITimingFormat(
            convertMinAddToDate(convertTimeFormatToDate(time.from), 30)
        ); // add 30 mins as to timingPicker reference

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
                        <CalTimingPicker
                            value={time.from}
                            refTiming={fromTimingRef}
                            pattern="12h"
                            onSelect={this.selectTiming.bind(this, 'from')}
                        />
                    )}
                </div>
                {!isReminder && <span>-</span>}
                {!isReminder && (
                    <div className="timeRange-diplayer-part">
                        {!isWholeDayEvt && (
                            // <span>{getTimingDisplay(time.to, '12h')}</span>
                            <CalTimingPicker
                                value={time.to}
                                refTiming={toTimingRef}
                                pattern="12h"
                                onSelect={this.selectTiming.bind(this, 'to')}
                                showOffset={true}
                            />
                        )}
                        {/* <span>{getFormattedDate(time.to.dayAt, 'literal')}</span> */}
                        <CalDatePicker
                            value={time.to.dayAt}
                            showValue={dayToShowValue}
                            onSelect={this.selectDate.bind(this, 'to')}
                        />
                    </div>
                )}
            </div>
        );

        return <div className="timeRange-diplayer">{timeRangeBody}</div>;
    }
}

export default injectIntl(TimeRangeDisplayer);
