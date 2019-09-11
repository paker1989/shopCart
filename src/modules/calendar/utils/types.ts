import { CSSProperties } from 'react';

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
    }

    // export interface IDateRangeFormat {
    //     from: Date;
    //     to: Date;
    // }

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

    export interface ICalPopoverCommonProps {
        positionner?: (...args) => {};
        dragPopNode?: Element;
        simuDragPopNode?: ISimuBoundingClientRect; // 手动模拟的dragPopNode节点，用于无法直接提供dragPopNode时positionner
        bottomCurshion?: number;
        topCurshion?: number;
        asideCurshion?: number;
    }

    export interface ICalEventInitOptions extends ICalPopoverCommonProps {
        timeRange?: ITimeRangeFormat;
        initDayEvtValue?: boolean;
    }

    export interface ICalEventPresenterProps extends ICalPopoverCommonProps {
        id?: string;
        zIndex?: number;
        containerNode?: Element; 
    }

    export interface IModalOptions {
        visible?: boolean;
        isClose?: boolean;
        contentStyle?: React.CSSProperties;
        layerStyle?:React.CSSProperties;
        contentClass?:  string;
        layerClass?: string;
        onClose?: (modalId?: string) => void,
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

    // export type TtimeDisplaySupportType =
    //     | CalendarNS.IDateRangeFormat
    //     | CalendarNS.ITimeRangeFormat
}
