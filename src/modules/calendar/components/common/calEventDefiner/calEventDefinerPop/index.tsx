import * as React from 'react';
import { createPortal } from 'react-dom';

import Position from '../position';

import { CalendarNS } from '../../../../utils/types';

import './calEventDefinerPop.scss';

export interface ICalEventDefinerPopProps
    extends CalendarNS.ICalEventInitOptions {
    id: string;
    zIndex?: number;
    containerNode: Element;
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
        const { positionner, id, dragPopNode, ...otherProps } = this.props;
        if (this.node === null) {
            this.node = document.getElementById(id);
        }
        if (!this.node || !dragPopNode) {
            return;
        }
        const definerBoundingBox = wrapperDimension(
            this.node.getBoundingClientRect()
        );
        const refBoundingBox = wrapperDimension(
            dragPopNode.getBoundingClientRect()
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

    render() {
        const { containerNode, id, zIndex } = this.props;
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
            ></div>
        );
        return createPortal(CalEventDefinerPopPanel, containerNode);
    }
}

export default CalEventDefinerPop;
