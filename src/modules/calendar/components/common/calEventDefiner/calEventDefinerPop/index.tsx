import * as React from 'react';
import { createPortal } from 'react-dom';
import throttle from 'lodash/throttle';

import CalEventDefinerPanel from '../calEventDefinerPanel';
import WindowEventHandler from '../../../../../../_packages_/utils/components/windowEventHandler';
import WindowResizeHandler from '../../../../../../_packages_/utils/components/windowResizeHandler';
import Position from '../position';

import { CalendarNS } from '../../../../utils/types';

import './calEventDefinerPop.scss';

export interface ICalEventDefinerPopProps
    extends CalendarNS.ICalEventInitOptions {
    id: string;
    zIndex?: number;
    containerNode: Element;
    onDestroy: (popId: string) => void;
}

export interface ICalEventDefinerPopStat {
    style: React.CSSProperties;
}

const wrapperDimension = function(boundingBox) {
    boundingBox.width = boundingBox.right - boundingBox.left;
    boundingBox.height = boundingBox.bottom - boundingBox.top;
    return boundingBox;
};

class CalEventDefinerPop extends React.Component<
    ICalEventDefinerPopProps,
    ICalEventDefinerPopStat
> {
    private node: HTMLElement = null;

    static defaultProps = {
        positionner: Position.autoMiddle,
    };

    constructor(props) {
        super(props);
        this.state = { style: {} };
    }

    componentDidMount() {
        this.adjustPosition();
    }

    adjustPosition = () => {
        const {
            positionner,
            id,
            dragPopNode,
            simuDragPopNode,
            ...otherProps
        } = this.props;
        if (this.node === null) {
            this.node = document.getElementById(id);
        }
        if (!this.node || (!dragPopNode && !simuDragPopNode)) {
            return;
        }
        const definerBoundingBox = wrapperDimension(
            this.node.getBoundingClientRect()
        );
        const refBoundingBox = wrapperDimension(
            dragPopNode ? dragPopNode.getBoundingClientRect() : simuDragPopNode
        );
        const position = positionner(definerBoundingBox, refBoundingBox, {
            ...otherProps,
        });
        this.setState({
            style: {
                ...position,
            },
        });
    };

    onWindowResize = throttle((evt, delta) => {
        if (delta.x !== 0 || delta.y !== 0) {
            console.log('resize');
            this.adjustPosition();
        }
    }, 500);

    onWindowScroll = throttle(this.adjustPosition, 500);

    onClose = () => {
        //   const { onDestroy, id } = this.props;
        //   onDestroy && onDestroy(id);
    };

    render() {
        const {
            containerNode,
            id,
            zIndex,
            timeRange,
            initDayEvtValue
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
                        onClick={this.onClose}
                    >
                        <div className="calevent-define-pop-container__close--wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                    <CalEventDefinerPanel timeRange={timeRange} initDayEvtValue={initDayEvtValue}/>
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
