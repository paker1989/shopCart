import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import cx from 'classnames';

import { FormattedTime, FormattedMessage } from 'react-intl';
import { CalendarNS } from '../../../../utils/types';
import {
    convertDBTimeFormatToDate,
    convertDBTimingToTimRange,
    getCalEventPopPosition,
} from '../../../../utils/timeRangeHelper';

import './calDaySimpleEvtItem.scss';

export interface CalDaySimpleEvtItemProps {
    item: CalEvtDataNS.ICalEvtSortedItemType;
    index: number;
    onSelect: (index: number, refObj: HTMLDivElement) => void;
    selected: boolean;
    type: 'timing' | 'normal';
    minSplitterHeight?: number;
}

const CalDaySimpleEvtItem = (props: CalDaySimpleEvtItemProps) => {
    const { item, onSelect, selected, index, type, minSplitterHeight } = props;
    const [layoutStyle, setLayoutStyle] = useState({});
    const self = useRef(null);
    const wrapperClass = cx({
        ['itemWrapper']: true,
        [`is-${type}`]: true,
        ['simpleItem-selected']: selected,
    });

    useEffect(() => {
        console.log('use effect');
        let timeRange;
        if (!minSplitterHeight || minSplitterHeight < 0) {
            return;
        }

        if (type === 'timing') {
            if (item.type === 'activity') {
                timeRange = convertDBTimingToTimRange(
                    (item as CalEvtDataNS.ICalEvtCompleteActivityDataModel).opts
                        .time
                );
            } else {
                timeRange = convertDBTimingToTimRange(
                    (item as CalEvtDataNS.ICalEvtSortedReminderDataModel).time
                );
            }
            setLayoutStyle(
                getCalEventPopPosition(minSplitterHeight, timeRange)
            );
        }
    }, [minSplitterHeight]);

    let date: Date;
    let content;

    console.log('render');

    switch (item.type) {
        case 'activity':
            const activity = item as CalEvtDataNS.ICalEvtCompleteActivityDataModel;
            if (activity.allDayEvt) {
                content = (
                    <div
                        className="calday-simpleevt-item is-allday is-activity"
                        style={{ backgroundColor: activity.opts.color }}
                    >
                        <span className="cal-unit cal-text">
                            {activity.title}
                        </span>
                    </div>
                );
                break;
            } else {
                date = convertDBTimeFormatToDate(
                    (activity.opts.time as CalendarNS.IDBTimingRangeFormat).from
                );
                content = (
                    <div className="calday-simpleevt-item is-timing is-activity">
                        <div className="cal-unit cal-dot">
                            <b
                                style={{ backgroundColor: activity.opts.color }}
                            ></b>
                        </div>
                        <span className="cal-unit cal-date">
                            <FormattedTime
                                value={date}
                                hour12={true}
                                hour="numeric"
                            />
                        </span>
                        <span className="cal-text">{activity.title}</span>
                    </div>
                );
                break;
            }
        case 'reminder':
            const data = item as CalEvtDataNS.ICalEvtSortedReminderDataModel;
            if (data.allDayEvt) {
                content = (
                    <div className="calday-simpleevt-item is-allday is-reminder">
                        <span className="cal-unit cal-icon">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-tag-fill"></use>
                            </svg>
                        </span>
                        <span className="cal-unit cal-text">
                            {data.reminders.length > 1 ? (
                                <FormattedMessage
                                    id="cal.nbReminders"
                                    values={{ nb: data.reminders.length }}
                                />
                            ) : (
                                data.reminders[0].title
                            )}
                        </span>
                    </div>
                );
                break;
            } else {
                date = convertDBTimeFormatToDate(data.time);
                content = (
                    <div className="calday-simpleevt-item is-timing is-reminder">
                        <div className="cal-unit cal-dot">
                            <b
                                style={{ backgroundColor: 'rgb(63, 81, 181)' }}
                            ></b>
                        </div>
                        <span className="cal-unit cal-date">
                            <FormattedTime
                                value={date}
                                hour12={true}
                                hour="numeric"
                            />
                        </span>
                        <span className="cal-unit cal-icon">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-tag-fill"></use>
                            </svg>
                        </span>
                        <span className="cal-unit cal-text">
                            {data.reminders.length > 1 ? (
                                <FormattedMessage
                                    id="cal.nbReminders"
                                    values={{ nb: data.reminders.length }}
                                />
                            ) : (
                                data.reminders[0].title
                            )}
                        </span>
                    </div>
                );
                break;
            }
    }
    return (
        <div
            ref={self}
            className={wrapperClass}
            style={layoutStyle}
            onClick={() => onSelect(index, self ? self.current : null)}
        >
            {content}
        </div>
    );
};

CalDaySimpleEvtItem.defaultProps = {
    type: 'normal',
};

export default CalDaySimpleEvtItem;
