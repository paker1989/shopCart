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
    onSelect?: CalendarNS.FnDateGridSelect,
    onMouseEventChange?: CalendarNS.FnOnDaySplitter;
}

/**
 * @description for month layout use
 */
class SingleDayGrid extends React.Component<ISingleDayGridProps, any> {
    static defaultProps = {
        isSelected: false,
        isDisable: false,
    };

    handleDefineEvent = (
        evt: React.MouseEvent<HTMLDivElement>,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { value, onMouseEventChange } = this.props;
        onMouseEventChange && onMouseEventChange(value, eventType);
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

        // const calEventPopEventClass = cx({
        //   []
        // })

        return (
            <div className="singleday-grid-container"
                onMouseDown={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'mousedown');
                }}
                onMouseEnter={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'mouseenter');
                }}
                onMouseUp={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'mouseup');
                }}
                onClick={(evt: React.MouseEvent<HTMLDivElement>) => {
                    this.handleDefineEvent(evt, 'click');
                }}
            >
                <div className={showValueClass}>
                    <div className="showValue__base">
                        <span>{showValue}</span>
                    </div>
                    {/* value supplementaire */}
                </div>
                {/* <div className={calEventPopEventClass}>

                </div> */}
            </div>
        );
    }
}

export default SingleDayGrid;
