export namespace CalendarNS {
    export interface ISingleDayDefaultHeaderProps {
        textAlign?: 'left' | 'right' | 'center';
        dayAt?: string;
        dateNumber?: number | string;
        cnCalendarNb?: string; //农历
    }

    export interface ITimingFormat {
        dayAt: Date;
        hourAt: number;
        minAt: number;
    }

    export interface ITimeRangeFormat {
        from: ITimingFormat;
        to: ITimingFormat;
        // dayAt: Date;
    }

    export interface IDateRangeFormat {
        from: Date;
        to: Date;
    }

    export interface ICalEventPopDynamicStyleFormat {
        top?: number;
        height?: number;
    }

    // export interface ICalEventTimingDisplayOptions {
    //     displayDaySplit?: boolean;
    //     pattern?: TTimingDisplayPattern;
    // }

    export interface IMonthCalEventProps {
        isInvolved?: boolean;
        isWeekStart?: boolean;
        isStart?: boolean;
        isEnd?: boolean;
    }

    export interface ISimuBoundingClientRect {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    }

    export interface ICalEventInitOptions {
        timeRange?: ITimeRangeFormat | IDateRangeFormat;
        positionner?: (...args) => {};
        dragPopNode?: Element;
        simuDragPopNode?: ISimuBoundingClientRect; // 手动模拟的dragPopNode节点，用于无法直接提供dragPopNode时positionner
        bottomCurshion?: number;
        topCurshion?: number;
        asideCurshion?: number;
    }

    export type TTimingDisplayPattern = '12h' | '24h';

    // TMinSplitterEventType
    export type TDefineEventType =
        | 'mousedown'
        | 'mouseenter'
        | 'mouseup'
        | 'click';

    export type FnOnMinuteSplitter = (
        timing: ITimingFormat,
        eventType: TDefineEventType
    ) => void;

    export type FnOnDaySplitter = (
        date: Date,
        eventType: TDefineEventType
    ) => void;

    export type FnDateGridSelect = (value: Date) => void;

    export type TCalEventPopDragStatusType = 'dragging' | 'holdon' | 'none';

    export type TtimeDisplaySupportType =
        | CalendarNS.IDateRangeFormat
        | CalendarNS.ITimeRangeFormat
        // | CalendarNS.ITimingFormat;
}
