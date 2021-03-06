import * as React from 'react';

import { CalEvtDataNS } from '../../../../../utils/evtTypes';
import ActivityViewDetail from './activityViewDetail';
import ReminderViewDetail from './reminderViewDetail';
import SortedRemindersViewDetail from './sortedRemindersViewDetail';
import { CalendarNS } from '../../../../../utils/types';

import '../calDayEvtViewPop.scss';

export interface ICalDayEvtViewContentProps
    extends CalendarNS.ICalDayViewContentCommonProps {
    item: CalEvtDataNS.ICalEvtSortedItemType;
}

const calDayEvtViewContent = (props: ICalDayEvtViewContentProps) => {
    const { item, ...otherProps } = props;

    let Content;
    switch (item.type) {
        case 'activity':
            const activity = item as CalEvtDataNS.ICalEvtCompleteActivityDataModel;
            Content = (
                <ActivityViewDetail activity={activity} {...otherProps} />
            );
            break;
        case 'reminder':
            const sortedReminder = item as CalEvtDataNS.ICalEvtSortedReminderDataModel;
            if (sortedReminder.reminders.length === 1) {
                Content = (
                    <ReminderViewDetail
                        {...otherProps}
                        reminder={sortedReminder.reminders[0]}
                    />
                );
            } else {
                Content = (
                    <SortedRemindersViewDetail
                        {...otherProps}
                        sortedReminder={sortedReminder}
                    />
                );
            }
            break;
    }
    return <div className="caldayEvtView-content">{Content}</div>;
};

export default calDayEvtViewContent;
