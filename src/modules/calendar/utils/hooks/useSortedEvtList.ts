import { useEffect, useState } from 'react';
import { compareTiming } from '../timeRangeHelper';
import { CalendarNS } from '../types';
import { CalEvtDataNS } from '../evtTypes';

/**
 * @returns sort result by from timing
 */
export default (
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[]
): CalEvtDataNS.ICalEvtSortedItemType[] => {
    const [sortedEvtList, setSortedEvtList] = useState([]);

    useEffect(() => {
        let foundIndex;
        const sortedAlldayEvts: CalEvtDataNS.ICalEvtSortedItemType[] = [];
        const sortedTimingEvts: CalEvtDataNS.ICalEvtSortedItemType[] = [];
        const allDayEvts = evts.filter(evt => evt.allDayEvt);
        const timingEvts = evts.filter(evt => !evt.allDayEvt);

        // add alldayActivities one by one
        sortedAlldayEvts.push(
            ...(allDayEvts.filter(
                evt => evt.type === 'activity'
            ) as CalEvtDataNS.ICalEvtCompleteActivityDataModel[])
        );

        //add 0 or 1 alldayreminder
        const allDayReminders = allDayEvts.filter(
            evt => evt.type === 'reminder'
        );
        if (allDayReminders.length > 0) {
            sortedAlldayEvts.push({
                type: 'reminder',
                reminders: allDayReminders as CalEvtDataNS.ICalEvtCompleteReminderDataModel[],
                allDayEvt: true,
            });
        }

        timingEvts.sort((a, b) => compareTiming(a.opts.time, b.opts.time)); //sort by from timing
        timingEvts.forEach(evt => {
            if (evt.type === 'activity') {
                sortedTimingEvts.push(
                    evt as CalEvtDataNS.ICalEvtCompleteActivityDataModel
                );
            } else {
                const reminderEvt = evt as CalEvtDataNS.ICalEvtCompleteReminderDataModel;
                foundIndex = sortedTimingEvts.findIndex(
                    item =>
                        item.type === 'reminder' &&
                        compareTiming(
                            (item as CalEvtDataNS.ICalEvtSortedReminderDataModel)
                                .time,
                            evt.opts.time as CalendarNS.IDBTimingFormat
                        ) === 0
                );
                if (foundIndex === -1) {
                    sortedTimingEvts.push({
                        time: (evt.opts
                            .time as CalendarNS.IDBTimingRangeFormat).from,
                        type: 'reminder',
                        allDayEvt: false,
                        reminders: [reminderEvt],
                    });
                } else {
                    (sortedTimingEvts[
                        foundIndex
                    ] as CalEvtDataNS.ICalEvtSortedReminderDataModel).reminders.push(
                        reminderEvt
                    );
                }
            }
        });
        setSortedEvtList(sortedAlldayEvts.concat(sortedTimingEvts));
    }, [evts]);

    return sortedEvtList;
};
