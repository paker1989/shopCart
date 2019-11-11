import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import cx from 'classnames';
import { FormattedTime, FormattedMessage } from 'react-intl';

import * as PopActionCreator from '../../../../store/action/popAction';
import { CalendarNS } from '../../../../utils/types';
import {
    convertDBTimeFormatToDate,
    convertDBTimingToTimRange,
    getCalEventPopPosition,
    getDBTimeRangeDisplay,
    getCalTimingActivitySiblingPosition,
} from '../../../../utils/timeRangeHelper';
import { getEvtCxtMenuProps } from '../../../../utils/eventUtils';

import './calDaySimpleEvtItem.scss';

export interface CalDaySimpleEvtItemProps {
    item: CalEvtDataNS.ICalEvtSortedItemType;
    index: number;
    onSelect: (
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        refObj: HTMLDivElement
    ) => void;
    selected: boolean;
    type: 'timing' | 'normal';
    minSplitterHeight?: number; // timing type only
    stIndex?: number; // same timing index: timing type only
    stArrayLenth?: number;
    referredPopId?: string;
}

const CalDaySimpleEvtItem = (props: CalDaySimpleEvtItemProps) => {
    const {
        item,
        onSelect,
        selected,
        index,
        type,
        minSplitterHeight,
        stIndex,
        stArrayLenth,
        referredPopId,
    } = props;
    const [layoutStyle, setLayoutStyle] = useState({});
    const dispatch = useDispatch();

    const self = useRef(null);
    const wrapperClass = cx({
        ['itemWrapper']: true,
        [`is-${type}`]: true,
        ['simpleItem-selected']: selected,
    });

    // set layout options if needed
    useEffect(() => {
        let timeRange;
        if (!minSplitterHeight || minSplitterHeight < 0) {
            return;
        }

        if (type === 'timing') {
            if (item.type === 'activity') {
                // only case for now
                timeRange = convertDBTimingToTimRange(
                    (item as CalEvtDataNS.ICalEvtCompleteActivityDataModel).opts
                        .time
                );
            } else {
                timeRange = convertDBTimingToTimRange(
                    (item as CalEvtDataNS.ICalEvtSortedReminderDataModel).time
                );
            }
            setLayoutStyle({
                ...getCalEventPopPosition(minSplitterHeight, timeRange),
                ...getCalTimingActivitySiblingPosition(stIndex, stArrayLenth),
            });
        }
    }, [minSplitterHeight, stIndex, stArrayLenth]);

    const handleContextmenu = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const { isRightClickable, id, color } = getEvtCxtMenuProps(item);
        if (isRightClickable) {
            e.preventDefault();
            e.stopPropagation();
            dispatch(
                PopActionCreator.updateCxtMenuProps({
                    ctxMenuVisible: true,
                    ctxMenuType: item.type,
                    ctxMenuEvtId: id,
                    ctxMenuX: e.clientX,
                    ctxMenuY: e.clientY,
                    ctxColor: color,
                    ctxReferredPopId: referredPopId,
                })
            );
        }
    };

    let date: Date;
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
                content =
                    type === 'normal' ? (
                        <div className="calday-simpleevt-item is-timingEvt is-activity">
                            <div className="cal-unit cal-dot">
                                <b
                                    style={{
                                        backgroundColor: activity.opts.color,
                                    }}
                                ></b>
                            </div>
                            <span className="cal-unit cal-date">
                                <FormattedTime value={date} hour12={false} />
                            </span>
                            <span className="cal-text">{activity.title}</span>
                        </div>
                    ) : (
                        <div
                            className="calday-simpleevt-item is-timingEvt is-activity"
                            style={{ backgroundColor: activity.opts.color }}
                        >
                            <span className="cal-text">{activity.title}</span>
                            <span className="cal-unit cal-date">
                                {getDBTimeRangeDisplay(activity.opts.time)}
                            </span>
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
                content =
                    type === 'normal' ? (
                        <div className="calday-simpleevt-item is-timingEvt is-reminder">
                            <div className="cal-unit cal-dot">
                                <b
                                    style={{
                                        backgroundColor: 'rgb(63, 81, 181)',
                                    }}
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
                    ) : (
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
                            <span className="cal-unit cal-date">
                                <FormattedTime
                                    value={date}
                                    hour12={true}
                                    hour="numeric"
                                />
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
            onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                // console.log('on evt mouse down');
                e.stopPropagation();
            }}
            onClick={e => {
                onSelect(e, index, self ? self.current : null);
            }}
            onContextMenu={handleContextmenu}
        >
            {content}
        </div>
    );
};

CalDaySimpleEvtItem.defaultProps = {
    type: 'normal',
};

export default CalDaySimpleEvtItem;
