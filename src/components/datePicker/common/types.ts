namespace DatePickers {
    export type Value = string | number | Date;

    export interface ICommonProps<Val = Value> {
        prefix?: string;
        placeholder?: string;
        isPopup?: boolean;
        value?: Val;
        onChange?: (val: Val) => void;
        disabled?: boolean;
        returnValueType?: 'date' | 'string' | 'number';
        // 次级props
        onOpen?: () => void;
        onClose?: () => void; 

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