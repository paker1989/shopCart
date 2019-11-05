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
        ctxMenuType?: 'activity' | 'reminder',
        ctxMenuEvtId?: any;
        ctxMenuVisible?: boolean;
        ctxColor?: string;
        
    }

    export type TPopReducerStatsType = IDefinerPopStats & ICxtMenuPropStats;
}
