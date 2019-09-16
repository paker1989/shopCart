// import * as React from 'react';

export namespace DatePickers {
    export type Value = string | number | Date;

    export interface ICommonProps {
        prefix?: string;
        className?: string;
        isPopover?: boolean;
        onClick?: FnDateGridSelect;
        onDbClick?: FnDateGridSelect;
        //optimize for yearLayout usage
        customizedHeader?: JSX.Element;
        presentOnly?: boolean; // if yes, only emit this.props.onChange
        displayYear?: number;
        displayMonth?: number;
        monthData?: IMonthDataRowFormat;
        displayWeeks?: boolean;
        locale?: TSupportedLocales;
    }

    export interface IDatePickerProps<Val = Value> extends ICommonProps {
        format?: string;
        placeholder?: string;
        value?: Val;
        disabled?: boolean;
        returnValueType?: 'date' | 'string' | 'number';
        // 次级props
        onOpen?: () => void;
        onClose?: () => void;
    }

    export interface IDatePickerPanelProps<Val = Value> extends ICommonProps {
        selectedDate?: Date;
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
        monthData: IMonthDataRowFormat;
    }

    export interface IMonthDataFormat {
        yearD: number;
        monthD: number;
        showDate: number;
    }

    export interface IMonthDataRowFormat {
        rows: DatePickers.IMonthDataFormat[][];
        weeks: number[];
    }

    export enum monthChangeType {
        _prev_,
        _next_,
    }

    export type GridValueType = Date | string | JSX.Element;

    export type FnMonthChange = (actionType: monthChangeType) => void;

    export type FnDateGridSelect = (
        value: Date,
        evt?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
}

export type TSupportedLocales = 'fr' | 'en' | 'zh';

export const dayNames: Array<string> = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
];
