import { CalendarNS } from '../utils/types';

export namespace CalendarRedux {
    export interface IReduxAction {
        type: string;
        payload?: any;
    }

    export interface IDateReducerStats {
        currentDate?: Date;
        currentWeek?: number;
        currentMonth?: number;
        currentYear?: number;
    }

    export interface IDefinerPopStats {
        defShowPop?: boolean;
        defTimeRange?: CalendarNS.ITimeRangeFormat;
        defPositionner?: string;
        defTopCurshion?: number;
        defBottomCurshion?: number;
        defAsideCurshion?: number;
        defPopId?: string;
        initDayEvtValue?: boolean;
        globalInitStatus?: 'stop' | 'init' | 'ready';
    }

    export interface ICxtMenuPropStats {
        ctxMenuX?: number | string;
        ctxMenuY?: number | string;
        ctxMenuType?: 'activity' | 'reminder';
        ctxMenuEvtId?: any;
        ctxMenuVisible?: boolean;
        ctxColor?: string;
    }

    export interface IViewPropStats {
        viewShowPop?: boolean;
        viewPositionner?: string;
        viewTopCurshion?: number;
        viewBottomCurshion?: number;
        viewAsideCurshion?: number;
        viewPopId?: string;
    }

    export interface IDayPresenterPropStats {
        dayPresenterShowPop?: boolean;
        dayPresenterDate?: Date;
        dayPresenterPositionner?: string;
        dayPresenterTopCurshion?: number;
        dayPresenterBottomCurshion?: number;
        dayPresenterAsideCurshion?: number;
        dayPresenterPopId?: string;
    }

    export type TPopReducerStatsType = IDefinerPopStats &
        ICxtMenuPropStats &
        IViewPropStats &
        IDayPresenterPropStats;
}
