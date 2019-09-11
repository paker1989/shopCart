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
    onClick?: DatePickers.FnDateGridSelect;
    onDbClick?: DatePickers.FnDateGridSelect;
}

export default class SimpleDateGrid extends React.PureComponent<
    ISimpleDateGridProps,
    any
> {
    private timer?: NodeJS.Timeout;

    static defaultProps = {
        isGrey: false,
        isToday: false,
        isSelected: false,
        isDisable: false,
        dimension: '14%', // 正常一行7格
    };

    /**
     * @description distinguished click and doubleClick evt
     */
    handleClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { value, isDisable, onClick, onDbClick } = this.props;

        if (isDisable || !(value instanceof Date) || (!onClick && !onDbClick)) {
            return;
        }

        if (typeof onDbClick === 'undefined') {
            onClick(value, evt);
        } else {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
                onDbClick(value, evt);
            } else {
                evt.persist();
                this.timer = setTimeout(() => {
                    onClick && onClick(value, evt);
                    this.timer = null;
                }, 200);
            }
        }
    };

    render() {
        const {
            className,
            showValue,
            isToday,
            isGrey,
            isSelected,
        } = this.props;
        const valueWraperClass: string = cx(
            {
                ['value-wraper']: true,
                ['is-today']: isToday,
                ['is-grey']: isGrey,
                ['is-selected']: isSelected,
            },
            className
        );

        return (
            <div
                className="simple-calgrid-container"
                onClick={this.handleClick}
            >
                <div className={valueWraperClass}>
                    <span>{showValue}</span>
                </div>
            </div>
        );
    }
}
