import { CalendarNS } from '../utils/types';

export namespace CalEvtDataNS {
    export interface ICalEvtSimpleDataModel {
        id?: string | number;
        title: string;
        type: 'activity' | 'reminder';
        allDayEvt: boolean;
    }

    export interface ICalEvtCompleteReminderDataModel
        extends ICalEvtSimpleDataModel {
        opts: ICalEvtReminderOptionDataModel;
    }

    export interface ICalEvtCompleteActivityDataModel
        extends ICalEvtSimpleDataModel {
        opts: ICalEvtActivityOptionDataModel;
    }

    export type ICalEvtCompleteDataModelType =
        | ICalEvtCompleteReminderDataModel
        | ICalEvtCompleteActivityDataModel;

    export interface ICalEvtReminderOptionDataModel {
        repeatOption:
            | 'everySameDay'
            | 'everyWorkDay'
            | 'everyDay'
            | 'everySameDate';
        time: CalendarNS.IDBTimingFormat;
        color: string;
    }

    export interface ICalEvtActivityOptionDataModel {
        time: CalendarNS.IDBTimingRangeFormat | CalendarNS.IDBTimingFormat;
        description?: string;
        address?: string;
        color: string;
    }

    export interface ICalEvtSortedReminderDataModel {
        type: 'reminder';
        allDayEvt: boolean;
        reminders: ICalEvtCompleteReminderDataModel[];
        time?: CalendarNS.IDBTimingFormat;
    }

    export type ICalEvtSortedItemType =
        | ICalEvtCompleteActivityDataModel
        | ICalEvtSortedReminderDataModel;
}
