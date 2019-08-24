import * as React from 'react';
import cx from 'classnames';

import './singleHourGrid.scss';

export interface ISingleHourGridProps {
    hourAt: number; // from 1 to 24;
}

class SingleHourGrid extends React.Component<ISingleHourGridProps, any> {
    render() {
        const { hourAt } = this.props;

        const wrapperClass = cx({
            ['calbody-content-singleHourGrid-container']: true,
            ['is-first']: hourAt === 1,
        });

        return <div className={wrapperClass} />;
    }
}

export default SingleHourGrid;
