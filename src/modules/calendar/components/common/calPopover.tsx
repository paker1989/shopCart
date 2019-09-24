import * as React from 'react';
import throttle from 'lodash/throttle';

import Position from './position';

import { CalendarNS } from '../../utils/types';

const wrapperDimension = function(boundingBox) {
    if (!boundingBox) {
        return {};
    }
    boundingBox.width = boundingBox.right - boundingBox.left;
    boundingBox.height = boundingBox.bottom - boundingBox.top;
    return boundingBox;
};

export interface ICalPopoverCommonStat {
    style: React.CSSProperties;
}

class CalPopover<
    T extends CalendarNS.ICalPopoverCommonProps
> extends React.Component<T, ICalPopoverCommonStat> {
    protected node: HTMLElement = null;
    protected dragNode: CalendarNS.ISimuBoundingClientRect = null;

    static defaultProps = {
        positionner: Position.autoMiddle,
    };

    constructor(props) {
        super(props);
        this.state = { style: {} };
    }

    componentDidMount() {
        const { dragPopNode, simuDragPopNode } = this.props;
        this.setDragNode(
            dragPopNode ? dragPopNode.getBoundingClientRect() : simuDragPopNode
        );
        this.adjustPosition();
    }

    setDragNode = (dragNode: CalendarNS.ISimuBoundingClientRect) => {
        this.dragNode = dragNode;
    };

    adjustPosition = () => {
        const { positionner, id, ...otherProps } = this.props;
        if (this.node === null) {
            this.node = document.getElementById(id);
        }
        const definerBoundingBox = wrapperDimension(
            this.node.getBoundingClientRect()
        );
        const refBoundingBox = wrapperDimension(this.dragNode);
        const position = positionner(definerBoundingBox, refBoundingBox, {
            ...otherProps,
        });
        console.log(position);

        this.setState({
            style: {
                ...position,
            },
        });
    };

    onWindowResize = throttle((evt, delta) => {
        if (delta.x !== 0 || delta.y !== 0) {
            this.adjustPosition();
        }
    }, 500);

    onWindowScroll = throttle(this.adjustPosition, 500);
}

export default CalPopover;
