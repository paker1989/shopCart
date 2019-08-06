import * as React from 'react';

namespace DatePickers {
    export type Value = string | number | Date;

    export interface ICommonProps {
        prefix?: string;
        className?: string;
    }

    export interface IDatePickerProps<Val = Value> extends ICommonProps {
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

    export interface IDatePickerPanelProps<Val = Value> extends ICommonProps {
        currentDate: Date;
        onChange?: (val: Val) => void;
        disabled?: boolean;
        returnValueType?: 'date' | 'string' | 'number';
        // 次级props
        onOpen?: () => void;
        onClose?: () => void; 
    }

    export interface IDatePickerStates {
        currentDate: Date;
    }

    export interface IDatePickerPanelStates {
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