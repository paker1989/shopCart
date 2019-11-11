import { CalEvtDataNS } from './evtTypes';

export function getEvtCxtMenuProps(
    item: CalEvtDataNS.ICalEvtSortedItemType
): any {
    if (item.type === 'activity') {
        return {
            isRightClickable: true,
            id: item._id,
            color: (item as CalEvtDataNS.ICalEvtCompleteActivityDataModel).opts
                .color,
        };
    } else {
        const reminderModel = item as CalEvtDataNS.ICalEvtSortedReminderDataModel;
        return {
            isRightClickable: reminderModel.reminders.length === 1,
            id: reminderModel.reminders[0]._id,
            color: reminderModel.reminders[0].opts.color,
        };
    }
}

export function getIdFromSortedEvt(
    evt: CalEvtDataNS.ICalEvtSortedItemType
): any {
    if ((evt as CalEvtDataNS.ICalEvtSortedReminderDataModel).reminders) {
        return (evt as CalEvtDataNS.ICalEvtSortedReminderDataModel).reminders[0]
            ._id;
    } else {
        return (evt as CalEvtDataNS.ICalEvtCompleteActivityDataModel)._id;
    }
}
