import * as React from 'react';
import cx from 'classnames';

import { DatePickers } from '../../common/types';

import './simpleDateGrid.scss';

export interface ISimpleDateGridProps {
    className?: string;
    showValue: string | number;
    value: DatePickers.GridValueType;
    isGrey?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    isDisable?: boolean;
    dimension?: string | number; // dimension that calendar give
    onSelect?: DatePickers.FnDateGridSelect;
    format?: DatePickers.
}

export default class SimpleDateGrid extends React.PureComponent
    <ISimpleDateGridProps, any> {

    static defaultProps = {
        isGrey: false,
        isToday: false,
        isSelected: false,
        isDisable: false,
        dimension: '14%' // 正常一行7格
    }

    render() {
        const { className,
            value,
            showValue,
            isToday,
            isGrey,
            isSelected,
            onSelect,
            isDisable,
        } = this.props;
        const valueWraperClass: string = cx({
            ['value-wraper']: true,
            ['is-today']: isToday,
            ['is-grey']: isGrey,
            ['is-selected']: isSelected
        }, className);

        return (
            <div className="simple-calgrid-container"
                onClick={() => {
                    if (!isDisable && value instanceof Date) {
                        onSelect(value);
                    }
                }}
            >
                <div className={valueWraperClass}>
                    <span>{showValue}</span>
                </div>
            </div>
        );
    }
}