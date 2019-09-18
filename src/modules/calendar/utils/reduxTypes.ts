export namespace CalendarRedux {

    export interface IReduxAction {
        type: string,
        payload?: {}
    }

    export interface IDateReducerStats {
        currentDate?: Date;
        currentWeek?: number;
        currentMonth?: number;
        currentYear?: number;
    }
}
