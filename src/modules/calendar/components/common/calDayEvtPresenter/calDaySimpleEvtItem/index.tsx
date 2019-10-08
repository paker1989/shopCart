import * as React from 'react';
import { useRef } from 'react';
import { CalEvtDataNS } from '../../../../utils/evtTypes';

import { FormattedTime, FormattedMessage } from 'react-intl';
import { CalendarNS } from '../../../../utils/types';
import { convertDBTimeFormatToDate } from '../../../../utils/timeRangeHelper';

import './calDaySimpleEvtItem.scss';

export interface CalDaySimpleEvtItemProps {
    item: CalEvtDataNS.ICalEvtSortedItemType;
    index: number;
    onSelect: (index: number, refObj: HTMLDivElement) => void;
    selected: boolean;
}

const CalDaySimpleEvtItem = (props: CalDaySimpleEvtItemProps) => {
    const { item, onSelect, selected, index } = props;
    const self = useRef(null);
    let date;
    let content;
    switch (item.type) {
        case 'activity':
            const activity = item as CalEvtDataNS.ICalEvtCompleteActivityDataModel;
            if (activity.allDayEvt) {
                content = (
                    <div
                        className="calday-simpleevt-item is-allday is-activity"
                        style={{ backgroundColor: activity.opts.color }}
                    >
                        <span className="cal-text">{activity.title}</span>
                    </div>
                );
                break;
            } else {
                date = convertDBTimeFormatToDate(
                    (activity.opts.time as CalendarNS.IDBTimingRangeFormat).from
                );
                content = (
                    <div className="calday-simpleevt-item is-timing is-activity">
                        <span
                            className="cal-dot"
                            style={{ backgroundColor: activity.opts.color }}
                        ></span>
                        <span className="cal-date">
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
                        <span className="cal-icon">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-tag-fill"></use>
                            </svg>
                        </span>
                        <span className="cal-text">
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
                date = convertDBTimeFormatToDate(data.timing);
                content = (
                    <div className="calday-simpleevt-item is-timing is-reminder">
                        <span
                            className="cal-dot"
                            style={{ backgroundColor: 'rgb(63, 81, 181)' }}
                        ></span>
                        <span className="cal-date">
                            <FormattedTime
                                value={date}
                                hour12={true}
                                hour="numeric"
                            />
                        </span>
                        <span className="cal-icon">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-tag-fill"></use>
                            </svg>
                        </span>
                        <span className="cal-text">
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
            className={selected? 'simpleItem-selected': ''}
            onClick={() => onSelect(index, self ? self.current : null)}
        >
            {content}
        </div>
    );
};

export default CalDaySimpleEvtItem;
