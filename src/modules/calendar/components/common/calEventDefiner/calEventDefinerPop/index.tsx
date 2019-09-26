import * as React from 'react';
import { createPortal } from 'react-dom';

import CalPopover from '../../calPopover';
import CalEventDefinerPanel from '../calEventDefinerPanel';
import CalModalManager from '../../calModalManager';
import CalConfirmPanel from '../../calConfirmPanel';

import WindowEventHandler from '../../../../../../_packages_/utils/components/windowEventHandler';
import WindowResizeHandler from '../../../../../../_packages_/utils/components/windowResizeHandler';
import Position from '../../position';

import { CalendarNS } from '../../../../utils/types';

import './calEventDefinerPop.scss';

const _test_time_range = {
    from: { dayAt: new Date(), hourAt: 12, minAt: 0 },
    to: { dayAt: new Date(), hourAt: 15, minAt: 0 },
};

class CalEventDefinerPop extends CalPopover<
    CalendarNS.ICalEventDefinerPopProps
> {
    static defaultProps = {
        positionner: Position.autoMiddle,
    };

    onClose = () => {
        const { locale } = this.props;
        CalModalManager.initModal(locale, CalConfirmPanel, {
            visible: true,
            isClose: false,
            contentClass: 'cal-confirm-panel-wrapper',
        });
    };

    changeDragNode = () => {
        const { getDragNode } = this.props;
        getDragNode(_test_time_range).then(newDragNode => {
            // this.setDragNode(newDragNode);
            this.adjustPosition();
        });
    };

    render() {
        const {
            containerNode,
            id,
            zIndex,
            timeRange,
            initDayEvtValue,
        } = this.props;
        const { style } = this.state;
        const wrapperStyle: React.CSSProperties = {
            ...style,
            zIndex,
        };
        const CalEventDefinerPopPanel = (
            <div
                className="calevent-define-pop-container"
                id={id}
                style={wrapperStyle}
            >
                <div className="calevent-define-pop-container__body">
                    <div
                        className="calevent-define-pop-container__close"
                        onClick={this.changeDragNode}
                    >
                        <div className="calevent-define-pop-container__close--wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                    <CalEventDefinerPanel
                        timeRange={timeRange}
                        initDayEvtValue={initDayEvtValue}
                    />
                </div>
                <WindowResizeHandler onResize={this.onWindowResize} />
                <WindowEventHandler
                    eventName="scroll"
                    callbackFn={this.onWindowScroll}
                />
            </div>
        );
        return createPortal(CalEventDefinerPopPanel, containerNode);
    }
}

export default CalEventDefinerPop;
