import * as React from 'react';
import cx from 'classnames';

import Popover from '../popover';

import './calTooltip.scss';

export interface ICalTooltipProps {
    content: any;
    contentClass?: string;
    trigger: string;
}

export interface ICalTooltipState {}

class CalTooltip extends React.Component<ICalTooltipProps, ICalTooltipState> {
    static defaultProps = {
        trigger: 'hover',
    };

    render() {
        const { content, children, contentClass, trigger } = this.props;
        let PopoverTrigger;
        const contentClassWrapper = cx(
            {
                ['cal-tooltip-content']: true,
            },
            contentClass
        );

        switch (trigger) {
            case 'click':
                PopoverTrigger = Popover.Trigger.ClickTrigger;
                break;
            case 'hover':
                PopoverTrigger = Popover.Trigger.HoverTrigger;
                break;
        }

        return (
            <Popover
                position={Popover.Placement.autoBottomMiddle}
                verCushion={5}
            >
                <PopoverTrigger>{children}</PopoverTrigger>
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
