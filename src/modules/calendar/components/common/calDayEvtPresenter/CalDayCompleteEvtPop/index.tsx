import * as React from 'react';
import { createPortal } from 'react-dom';
import CalPopover from '../../calPopover';
import { CalendarNS } from '../../../../utils/types';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import CalDayCompleteEvtContent from './calDayCompleteEvtContent';
import WindowEventHandler from '../../../../../../_packages_/utils/components/windowResizeHandler';
import WindowResizeHandler from '../../../../../../_packages_/utils/components/windowResizeHandler';

import './calDayCompleteEvtPop.scss';

export interface CalDayCompleteEvtPopProps
    extends CalendarNS.ICalPopoverCommonProps {
    item: CalEvtDataNS.ICalEvtSortedItemType;
}

class CalDayCompleteEvtPop extends CalPopover<CalDayCompleteEvtPopProps> {
    componentDidUpdate(prevProps: CalDayCompleteEvtPopProps) {
        if (prevProps.id !== this.props.id) {
            this.adjustPosition();
        }
    }

    render() {
        const { containerNode, zIndex, id, ...otherProps } = this.props;
        const { style } = this.state;

        const wrapperStyle: React.CSSProperties = {
            ...style,
            zIndex,
        };
        const presenterContent = (
            <div className="caldayCompleteEvt-pop" style={wrapperStyle} id={id}>
                <CalDayCompleteEvtContent {...otherProps} />
                <WindowResizeHandler onResize={this.onWindowResize} />
                <WindowEventHandler
                    eventName="scroll"
                    callbackFn={this.onWindowScroll}
                />
            </div>
        );

        return containerNode
            ? createPortal(presenterContent, containerNode)
            : presenterContent;
    }
}

export default CalDayCompleteEvtPop;
