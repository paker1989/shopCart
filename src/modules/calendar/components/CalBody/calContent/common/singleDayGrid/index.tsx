import * as React from 'react';

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
    render() {
        const { showValue } = this.props;
        return <div className="singleday-grid-container">{showValue}</div>;
    }
}

export default SingleDayGrid;
