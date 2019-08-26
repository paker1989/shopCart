import * as React from 'react';
import cx from 'classnames';
import assign from 'lodash/assign';
import {
    getCalEventPopPosition,
    getTimeRangeDisplay,
} from '../../../../../utils/timeRangeHelper';
import { CalendarNS } from '../../../../../utils/types';

import './calEventPop.scss';

export interface ICalEventProps {
    className?: string;
    modalStyle?: {};
    type?: 'dragging' | 'holding' | 'defined'; // dragging to define or defined event
    title?: string;
    heightPerUnit?: number; // height per min splitter, calculate abs position accordingly
    timeRange?: CalendarNS.ITimeRangeFormat;
}

const _test_no_title = '(无标题)';
const _test_bg_color = 'rgb(121, 134, 203)';

export default class CalendarEventPop extends React.Component<
    ICalEventProps,
    any
> {
    static defaultProps = {
        title: _test_no_title,
        type: 'defined',
    };
    render() {
        const {
            type,
            className,
            modalStyle,
            title,
            timeRange,
            heightPerUnit,
        } = this.props;

        const modalClass = cx(
            {
                ['calevent-pop-container']: true,
                [`is-${type}`]: true,
            },
            className
        );

        const defaultModalStyle: React.CSSProperties = {
            position: 'absolute',
            background: _test_bg_color,
            ...getCalEventPopPosition(heightPerUnit, timeRange),
        };

        const wrapperStyle = modalStyle
            ? assign(defaultModalStyle, modalStyle)
            : defaultModalStyle;

        return (
            <div className={modalClass} style={wrapperStyle}>
                <div className="calevent-pop-container__main">
                    <div className="calevent-pop-container__title no-uselect font-calEvent ">
                        {title}
                    </div>
                    <div className="calevent-pop-container__timeRange no-uselect font-calEvent ">
                        {getTimeRangeDisplay(timeRange)}
                    </div>
                </div>
            </div>
        );
    }
}
