import * as React from 'react';
import cx from 'classnames';

import { CalendarNS } from '../../../../../utils/types';
import calConfig from '../../../../../assets/scripts/calendar.config';

import './singleHourGrid.scss';

export interface ISingleHourGridProps {
    onDragging?: boolean;
    dayAt: Date;
    hourAt: number; // from 1 to 24;
    onMouseEventChange?: CalendarNS.FnOnMinuteSplitter;
}

class SingleHourGrid extends React.Component<ISingleHourGridProps, any> {
    gridRef: React.RefObject<HTMLDivElement>;

    static defaultProps = {
        onDragging: false,
    };

    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
    }

    handleMinSplitterEvent = (
        evt: React.MouseEvent<HTMLDivElement>,
        minSplitIndex: number,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { dayAt, hourAt, onMouseEventChange } = this.props;
        const { hourSplitter } = calConfig;
        const minAt = (60 / hourSplitter) * minSplitIndex;
        onMouseEventChange &&
            onMouseEventChange({ dayAt, hourAt, minAt }, eventType);
    };

    render() {
        const { hourAt, onDragging } = this.props;
        const { hourSplitter } = calConfig;

        const wrapperClass = cx({
            ['calbody-content-singleHourGrid-container']: true,
            ['is-first']: hourAt === 0,
        });

        let minSplitters = [];
        for (let i = 0; i < hourSplitter; i++) {
            minSplitters.push(
                <div
                    onMouseDown={(evt: React.MouseEvent<HTMLDivElement>) => {
                        this.handleMinSplitterEvent(evt, i, 'mousedown');
                    }}
                    onMouseEnter={(evt: React.MouseEvent<HTMLDivElement>) => {
                        // console.log('mouse-enter');
                        this.handleMinSplitterEvent(evt, i, 'mouseenter');
                    }}
                    onMouseUp={(evt: React.MouseEvent<HTMLDivElement>) => {
                        this.handleMinSplitterEvent(evt, i, 'mouseup');
                    }}
                    onClick={(evt: React.MouseEvent<HTMLDivElement>) => {
                        this.handleMinSplitterEvent(evt, i, 'click');
                    }}
                    style={{ height: `${100 / hourSplitter}%` }}
                    key={`minSplitter-${i}`}
                    className="calbody-content-singleHourGrid-container__minSplitter"
                >
                    <div
                        className="overlay"
                        style={{ zIndex: onDragging ? 999 : 0 }}
                    ></div>
                </div>
            );
        }

        return (
            <div ref={this.gridRef} className={wrapperClass}>
                {minSplitters}
            </div>
        );
    }
}

export default SingleHourGrid;
