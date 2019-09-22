import * as React from 'react';
import cx from 'classnames';

import Popover from '../popover';

import './calTooltip.scss';

export interface ICalTooltipProps {
    content: any;
    contentClass?: string;
}

export interface ICalTooltipState {}

class CalTooltip extends React.Component<ICalTooltipProps, ICalTooltipState> {
    render() {
        const { content, children, contentClass } = this.props;
        const contentClassWrapper = cx(
            {
                ['cal-tooltip-content']: true,
            },
            contentClass
        );

        return (
            <Popover
                position={Popover.Placement.autoBottomMiddle}
                verCushion={5}
            >
                <Popover.Trigger.HoverTrigger>
                    {children}
                </Popover.Trigger.HoverTrigger>
                <Popover.Content>
                    <div className={contentClassWrapper}>
                        <span>{content}</span>
                    </div>
                </Popover.Content>
            </Popover>
        );
    }
}

export default CalTooltip;
