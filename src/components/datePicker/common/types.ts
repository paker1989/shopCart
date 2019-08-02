namespace DatePickers {
    export interface ICommonProps {
        prefix?: string;
    }

    export interface ICommonState {
        displayYear: number;
        displayMonth: number;
        monthData: DatePickers.IMonthDataFormat[];
    }

    export interface IMonthDataFormat {
        yearD: number;
        monthD: number;
        showDate: number;
    }
}

export default DatePickers;