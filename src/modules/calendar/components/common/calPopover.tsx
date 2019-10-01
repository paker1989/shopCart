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

export interface ICalPopoverCommonState {
    style: React.CSSProperties;
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

        // if (!dragPopNode && !dragNodeClientRect) {
        //     return;
        // }
        
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
        // console.log('====definer box ==');
        // console.log(definerBoundingBox);
        // console.log('====refBounding box ==');
        // console.log(refBoundingBox);
        const position = positionner(definerBoundingBox, refBoundingBox, {
            ...otherProps,
        });
        // console.log('=====position result');
        // console.log(position);

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
