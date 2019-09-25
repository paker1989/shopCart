import * as React from 'react';
import { createPortal } from 'react-dom';

import CalPopover from '../calPopover';
import Position from '../position';
import DayEvtPresenterContent from './content';
import WindowEventHandler from '../../../../../_packages_/utils/components/windowEventHandler';
import WindowResizeHandler from '../../../../../_packages_/utils/components/windowResizeHandler';

import './dayEvtPresenter.scss';
import { CalendarNS } from '../../../utils/types';

class DayEvtPresenter extends CalPopover<CalendarNS.ICalEventPresenterProps> {
    static defaultProps = {
        positionner: Position.autoAside,
    };

    render() {
        const { containerNode, zIndex, id, ...otherProps } = this.props;
        const { style } = this.state;

        const wrapperStyle: React.CSSProperties = {
            ...style,
            zIndex,
        };
        const presenterContent = (
            <div
                className="dayEvent-presenter-panel"
                style={wrapperStyle}
                id={id}
            >
                <DayEvtPresenterContent {...otherProps} />
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

export default DayEvtPresenter;
