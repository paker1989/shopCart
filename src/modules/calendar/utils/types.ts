export namespace CalendarNS {
    export interface ISingleDayDefaultHeaderProps {
        textAlign?: 'left' | 'right' | 'center';
        dayAt?: any;
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

    export interface ISimuBoundingClientRect {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    }

    export interface ICalPopoverPositionProps {
        bottomCurshion?: number;
        topCurshion?: number;
        asideCurshion?: number;
    }

    export interface ICalPopoverCommonProps extends ICalPopoverPositionProps {
        id?: string;
        positionner?: (...args) => {};
        dragPopNode?: Element;
        simuDragPopNode?: ISimuBoundingClientRect; // 手动模拟的dragPopNode节点，用于无法直接提供dragPopNode时positionner
        zIndex?: number;
        containerNode?: Element;
        locale?: TLocales;
    }

    export interface ICalEventDefinerPopProps
        extends CalendarNS.ICalPopoverCommonProps {
        timeRange?: CalendarNS.ITimeRangeFormat;
        initDayEvtValue?: boolean;
        onDestroy?: (popId: string) => void;
    }

    export interface ICalEventPresenterProps extends ICalPopoverCommonProps {
        date: Date;
        showClose?: boolean;
    }

    export interface IModalOptions {
        visible?: boolean;
        isClose?: boolean;
        contentStyle?: React.CSSProperties;
        layerStyle?: React.CSSProperties;
        contentClass?: string;
        layerClass?: string;
        onClose?: (modalId?: string) => void;
    }

    export interface ICalRouterParams {
        month?: string;
        year?: string;
        date?: string;
        lang?: string;
        layout?: string;
    }

    export type TTimingDisplayPattern = '12h' | '24h';

    export type TLocales = 'en' | 'fr' | 'zh';

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
}
