import { CalendarNS } from '../utils/types';

export namespace CalendarRedux {
    export interface IReduxAction {
        type: string;
        payload?: {};
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
    }
}
