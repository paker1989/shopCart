import { CalendarNS } from '../utils/types';

export namespace CalEvtDataNS {
    export interface ICalEvtSimpleDataModel {
        id: string | number;
        title: string;
        type: 'activity' | 'reminder';
        allDayEvt: boolean;
    }

    export interface ICalEvtCompleteDataModel extends ICalEvtSimpleDataModel {
        options:
            | ICalEvtReminderOptionDataModel
            | ICalEvtActivityOptionDataModel;
    }

    export interface ICalEvtReminderOptionDataModel {
        repeatOption:
            | 'everySameDay'
            | 'everyWorkDay'
            | 'everyDay'
            | 'everySameDate';
        time: CalendarNS.ITimeRangeFormat;
    }

    export interface ICalEvtActivityOptionDataModel {
        time: CalendarNS.ITimeRangeFormat;
        description?: string;
        address?: string;
    }
}
