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

    export interface ICalEventPopDynamicStyleFormat {
        top?: number;
        height?: number;
    }

    export type TMinSplitterEventType = 'mousedown' | 'mouseenter' | 'mouseup' | 'click';

    export type FnOnMinuteSplitter = (
        timing: ITimingFormat,
        eventType: TMinSplitterEventType
    ) => void;
}
