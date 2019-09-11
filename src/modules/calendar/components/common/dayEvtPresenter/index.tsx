import * as React from 'react';
import { createPortal } from 'react-dom';
import throttle from 'lodash/throttle';

import Position from '../position';
import WindowEventHandler from '../../../../../_packages_/utils/components/windowEventHandler';
import WindowResizeHandler from '../../../../../_packages_/utils/components/windowResizeHandler';

import { CalendarNS } from '../../../utils/types';
import './dayEvtPresenter.scss';

const wrapperDimension = function(boundingBox) {
    boundingBox.width = boundingBox.right - boundingBox.left;
    boundingBox.height = boundingBox.bottom - boundingBox.top;
    return boundingBox;
};

export interface IDayEvtPresenterStat {
    style: React.CSSProperties;
}

class DayEvtPresenter extends React.Component<
    CalendarNS.ICalEventPresenterProps,
    IDayEvtPresenterStat
> {
    private node: HTMLElement = null;

    static defaultProps = {
        positionner: Position.autoAside,
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

    render() {
        const { containerNode, zIndex, id } = this.props;
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
                <div>just for test</div>
                <WindowResizeHandler onResize={this.onWindowResize} />
                <WindowEventHandler
                    eventName="scroll"
                    callbackFn={this.onWindowScroll}
                />
            </div>
        );

        return containerNode
            ? createPortal(presenterContent, containerNode)
            : null;
    }
}

export default DayEvtPresenter;
