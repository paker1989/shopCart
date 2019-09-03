export namespace CalendarNS {
    export interface ISingleDayDefaultHeaderProps {
        textAlign?: 'left' | 'right' | 'center';
        dayAt?: string;
        dateNumber?: number | string;
        cnCalendarNb?: string; //农历
    }

    export interface ITimingFormat {
        hourAt: number;
        minAt: number;
    }

    export interface ITimeRangeFormat {
        from: ITimingFormat;
        to: ITimingFormat;
    }

    export interface IDateRangeFormat {
        from: Date;
        to: Date; 
    }

    export interface ICalEventPopDynamicStyleFormat {
        top?: number;
        height?: number;
    }

    export interface IMonthCalEventProps {
        isInvolved?: boolean;
        isWeekStart?: boolean;
        isStart?: boolean;
        isEnd?: boolean;
    }

    // TMinSplitterEventType
    export type TDefineEventType = 'mousedown' | 'mouseenter' | 'mouseup' | 'click';

    export type FnOnMinuteSplitter = (
        timing: ITimingFormat,
        eventType: TDefineEventType
    ) => void;

    export type FnOnDaySplitter = (
        date: Date,
        eventType: TDefineEventType
    ) => void;

    export type FnDateGridSelect = (value: Date) => void;
}
