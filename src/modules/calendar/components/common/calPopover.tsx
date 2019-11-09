import * as React from 'react';
import throttle from 'lodash/throttle';

import Position from './position';
import { CalendarNS } from '../../utils/types';

const wrapperDimension = function(boundingBox) {
    if (!boundingBox) {
        return {};
    }
    const { top, left, right, bottom } = boundingBox;
    const width = boundingBox.right - boundingBox.left;
    const height = boundingBox.bottom - boundingBox.top;
    return { top, left, right, bottom, width, height };
};

export interface ICalPopoverCommonState {
    style?: React.CSSProperties;
    edited?: boolean;
}

class CalPopover<
    T extends CalendarNS.ICalPopoverCommonProps
> extends React.Component<T, ICalPopoverCommonState> {
    protected node: HTMLElement = null;

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
        console.log('adjust position');
        const {
            positionner,
            id,
            dragPopNode,
            dragNodeClientRect,
            ...otherProps
        } = this.props;

        if (!this.node) {
            this.node = document.getElementById(id);
        }

        const definerBoundingBox = wrapperDimension(
            this.node.getBoundingClientRect()
        );
        const refBoundingBox = wrapperDimension(
            dragPopNode
                ? dragPopNode.getBoundingClientRect()
                : dragNodeClientRect
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
            this.adjustPosition();
        }
    }, 500);

    onWindowScroll = throttle(this.adjustPosition, 500);
}

export default CalPopover;
