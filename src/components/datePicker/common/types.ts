// import * as React from 'react';

export namespace DatePickers {
    export type Value = string | number | Date;

    export interface ICommonProps {
        prefix?: string;
        className?: string;
        isPopover?: boolean;
    }

    export interface IDatePickerProps<Val = Value> extends ICommonProps {
        placeholder?: string;
        value?: Val;
        onChange?: (val: Val) => void;
        disabled?: boolean;
        returnValueType?: 'date' | 'string' | 'number';
        // 次级props
        onOpen?: () => void;
        onClose?: () => void;
    }

    export interface IDatePickerPanelProps<Val = Value> extends ICommonProps {
        selectedDate?: Date;
        onChange?: (val: Val) => void;
        disabled?: boolean;
        returnValueType?: 'date' | 'string' | 'number';
        // 次级props
        onOpen?: () => void;
        onClose?: () => void;
    }

    export interface IDatePickerStates {
        // currentDate: Date;
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

    export enum monthChangeType { _prev_, _next_ };

    export type GridValueType = Date | string;

    export type FnMonthChange = (actionType: monthChangeType) => void;

    export type FnDateGridSelect = (value: Date) => void;
}

export const dayNames: Array<string> = [
    '日', '一', '二', '三', '四', '五', '六'
]