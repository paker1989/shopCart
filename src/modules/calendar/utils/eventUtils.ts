import { CalEvtDataNS } from './evtTypes';

export function getEvtCxtMenuProps(
    item: CalEvtDataNS.ICalEvtSortedItemType
): any {
    if (item.type === 'activity') {
        return {
            isRightClickable: true,
            id: item._id,
        };
    } else {
        const reminderModel = item as CalEvtDataNS.ICalEvtSortedReminderDataModel;
        return {
            isRightClickable: reminderModel.reminders.length === 1,
            id: reminderModel.reminders[0]._id,
        };
    }
}
