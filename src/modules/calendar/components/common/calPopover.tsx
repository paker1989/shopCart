import * as React from 'react';
import throttle from 'lodash/throttle';

import Position from './position';

import { CalendarNS } from '../../utils/types';

const wrapperDimension = function(boundingBox) {
    boundingBox.width = boundingBox.right - boundingBox.left;
    boundingBox.height = boundingBox.bottom - boundingBox.top;
    return boundingBox;
};

export interface ICalPopoverCommonStat {
    style: React.CSSProperties;
}

class CalPopover<T extends CalendarNS.ICalPopoverCommonProps> extends React.Component<T, ICalPopoverCommonStat> {
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
}

export default CalPopover;
