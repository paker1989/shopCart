import * as React from 'react';
import cx from 'classnames';

import { CalendarNS } from '../../../../../utils/types';

import './singleDayGrid.scss';

export interface ISingleDayGridProps {
    className?: string;
    showValue: string | number;
    value: Date;
    isGrey?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    isDisable?: boolean;
    onSelect?: CalendarNS.FnDateGridSelect;
}

/**
 * @description for month layout use
 */
class SingleDayGrid extends React.Component<ISingleDayGridProps, any> {
    static defaultProps = {
        isSelected: false,
        isDisable: false,
    };

    render() {
        const {
            showValue,
            isToday,
            isGrey,
            isDisable,
            isSelected,
        } = this.props;

        const showValueClass = cx({
            ['singleday-grid-container-showValue']: true,
            ['is-today']: isToday,
            ['is-grey']: isGrey,
            ['is-disable']: isDisable,
            ['is-selected']: isSelected,
        });

        return (
            <div className="singleday-grid-container">
                <div className={showValueClass}>
                    <span className="showValue__base">
                        {showValue}
                    </span>
                    {/* value supplementaire */}
                </div>
            </div>
        );
    }
}

export default SingleDayGrid;
