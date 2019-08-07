import * as React from 'react';
import cx from 'classnames';

import './simpleDateGrid.scss';

export interface ISimpleDateGridProps {
    value: number;
    isGrey?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    dimension?: string | number; // dimension that calendar give
}

export default class SimpleDateGrid extends React.PureComponent
    <ISimpleDateGridProps, any> {

    static defaultProps = {
        isGrey: false,
        isToday: false,
        isSelected: false,
        dimension: '14%' // 正常一行7格
    }

    render() {
        const { value, isToday, isGrey, isSelected } = this.props;
        const valueWraperClass: string = cx({
          ['value-wraper']: true,
          ['is-today']: isToday,
          ['is-grey']: isGrey,
          ['is-selected']: isSelected
        });

        return (
            <div className="simple-calgrid-container" /*style={gridContainerStyle}*/>
                <div className={valueWraperClass}>
                    <span>{value}</span>
                </div>
            </div>
        );
    }
}