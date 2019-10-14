import { CalEvtDataNS } from './evtTypes';

export namespace CalendarNS {
    export interface ISingleDayDefaultHeaderProps {
        textAlign?: string;
        dayAt?: any;
        date?: Date;
        cnCalendarNb?: string; //农历
        onClick?: (param: string | Date) => void;
        evts?: CalEvtDataNS.ICalEvtCompleteDataModelType[];
        nbDisplayEvts?: number;
        updateNbEvts?: (nbEvt: number) => void;
    }

    export interface IDBTimingFormat {
        year: number;
        month: number;
        dayAt: number;
        hourAt: number;
        minAt: number;
    }

    export interface IDBTimingRangeFormat {
        from: IDBTimingFormat;
        to: IDBTimingFormat;
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
        dragNodeClientRect?: ISimuBoundingClientRect; // 手动模拟的dragPopNode节点，用于无法直接提供dragPopNode时positionner
        zIndex?: number;
        containerNode?: Element; // deprecated
        locale?: TLocales;
    }

    export interface ICalEventDefinerPopProps
        extends CalendarNS.ICalPopoverCommonProps {
        timeRange?: CalendarNS.ITimeRangeFormat;
        initDayEvtValue?: boolean;
        onDestroy?: (popId: string) => void;
        getDragNode?: (
            timeRange: ITimeRangeFormat
        ) => Promise<ISimuBoundingClientRect>;
    }

    export interface ICalEventPresenterProps extends ICalPopoverCommonProps {
        date?: Date;
        showClose?: boolean;
        onClose?: () => void;
        getDragNode?: (date: Date) => Promise<ISimuBoundingClientRect>;
        loadEvts?: any;
        // simpleEvts?: CalEvtDataNS.ICalEvtSimpleDataModel[];
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

    export interface IPopReference {
        container: any;
        date: Date;
    }

    // deprecated
    export interface ICalDefinerControllerState {
        showDefinerPop: boolean;
        timeRange: ITimeRangeFormat;
        dragNode?: HTMLDivElement;
        dragNodeClientRect?: ISimuBoundingClientRect;
        definerPopId: string;
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
