import * as React from 'react';
import cx from 'classnames';
import assign from 'lodash/assign';
import { getCalEventPopPosition } from '../../../../../utils/timeRangeHelper';
import { CalendarNS } from '../../../../../utils/types';

import './calEventPop.scss';

export interface ICalEventProps {
    className?: string;
    modalStyle?: {};
    type?: 'dragging' | 'defined'; // dragging to define or defined event
    title?: string;
    heightPerUnit?: number; // height per min splitter, calculate abs position accordingly
    timeRange?: CalendarNS.ITimeRangeFormat;
}

const _test_no_title = '<无标题>';
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
                <div className="calevent-modal-container__title">{title}</div>
                <div className="calevent-modal-container__timeRange">
                    {timeRange &&
                        `${timeRange.from.hourAt}点${
                            timeRange.from.minAt
                        }分 - ${timeRange.to.hourAt}点${timeRange.to.minAt}分`}
                </div>
            </div>
        );
    }
}
