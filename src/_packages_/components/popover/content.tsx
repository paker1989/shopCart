import * as React from 'react';
import { createPortal } from 'react-dom';
import throttle from 'lodash/throttle';

import getPositionnedParent from '../../utils/getPositionnedParent';
import WindowEventHandler from '../../utils/components/windowEventHandler';
import WindowResizeHandler from '../../utils/components/windowResizeHandler';

const wrapperDimension = function(boundingBox) {
    if (!boundingBox) {
        return {};
    }
    const { top, left, right, bottom } = boundingBox;
    const width = boundingBox.right - boundingBox.left;
    const height = boundingBox.bottom - boundingBox.top;
    return { top, left, right, bottom, width, height };
};

export interface IPopoverContentProps {
    className?: string;
    getTriggerNode: () => any;
    getContentNode: () => any;
    placement?: (...options) => any;
    cushion?: number;
    horCushion?: number;
    verCushion?: number;
    visible?: boolean;
    containerSelector?: string; // trigger additional class
    contentRefChange?: (contentRefInstance: any) => void;
    disableEvents?: string[];
    isUnmountOnInvisible: boolean;
}

export interface IPopoverContentState {
    style?: {};
}

class Content extends React.Component<
    IPopoverContentProps,
    IPopoverContentState
> {
    constructor(props) {
        super(props);
        this.state = { style: {} };
    }

    componentDidMount() {
        this.adjustPosition();
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible && prevProps.visible !== this.props.visible) {
            this.adjustPosition();
        }
    }

    contentRefChange = contentRefInstance => {
        this.props.contentRefChange(contentRefInstance);
    };

    adjustPosition = () => {
        const {
            getTriggerNode,
            getContentNode,
            placement,
            cushion,
            horCushion,
            verCushion,
            containerSelector,
        } = this.props;

        const containerNode = document.querySelector(containerSelector),
            anchor = getTriggerNode(),
            content = getContentNode(),
            positionnedParent = getPositionnedParent(containerNode, true);

        if (!anchor || !content || !positionnedParent) {
            return;
        }

        const anchorBoundingBox = wrapperDimension(
                anchor.getBoundingClientRect()
            ),
            contentBoundingBox = wrapperDimension(
                content.getBoundingClientRect()
            ),
            parentBoundingBox = wrapperDimension(
                positionnedParent.getBoundingClientRect()
            );

        const position = placement(
            anchorBoundingBox,
            contentBoundingBox,
            parentBoundingBox,
            { cushion, verCushion, horCushion }
        );

        this.setState({
            style: {
                ...position,
            },
        });
    };

    onWindowResize = throttle((evt, delta) => {
        const { visible } = this.props;
        if (visible && (delta.x !== 0 || delta.y !== 0)) {
            this.adjustPosition();
        }
    }, 16);

    onWindowScroll = throttle(this.adjustPosition, 16);

    render() {
        const {
            visible,
            containerSelector,
            className,
            isUnmountOnInvisible,
        } = this.props;
        const { style } = this.state;

        let wrapperStyle: React.CSSProperties = {
            ...style,
            zIndex: 2000,
            // visibility: visible ? 'visible' : 'hidden',
        };

        if (isUnmountOnInvisible == false) {
            wrapperStyle.visibility = visible ? 'visible' : 'hidden';
        }

        const containerNode = document.querySelector(containerSelector);

        const wrappedChildren = (
            <div
                ref={this.contentRefChange}
                className={className}
                style={wrapperStyle}
            >
                {this.props.children}
                <WindowResizeHandler onResize={this.onWindowResize} />
                <WindowEventHandler
                    eventName="scroll"
                    callbackFn={this.onWindowScroll}
                />
            </div>
        );

        if (isUnmountOnInvisible) {
            return visible
                ? createPortal(wrappedChildren, containerNode)
                : null;
        } else {
            return createPortal(wrappedChildren, containerNode);
        }
    }
}

export default Content;
