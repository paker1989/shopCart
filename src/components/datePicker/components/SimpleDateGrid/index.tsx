import * as React from 'react';
import cx from 'classnames';

import './simpleDateGrid.scss';

export interface ISimpleDateGridProps {
    value: number;
    isGrey?: boolean;
    isFocus?: boolean;
    dimension?: string; // dimension that calendar give
}

export default class SimpleDateGrid extends React.PureComponent
    <ISimpleDateGridProps, any> {

    static defaultProps = {
        isGrey: false,
        isFocus: false,
        dimension: '12.5%' // 正常一行8格
    }

    render() {
        const { value, isFocus, isGrey, dimension } = this.props;
        const valueWraperClass: string = cx({
          ['value-wraper']: true,
          ['is-focus']: isFocus,
          ['is-grey']: isGrey
        });
        const gridContainerStyle = {
            width: dimension
        }

        return (
            <div className="simple-calgrid-container" style={gridContainerStyle}>
                <div className={valueWraperClass}>
                    <span>{value}</span>
                </div>
            </div>
        );
    }
}