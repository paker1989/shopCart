import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import './tooltip.scss';

export interface ITooltipProps {
    showComponent?: React.ReactInstance;
}

export interface ITooltipState {
    clientX: number;
    clientY: number;
    isVisible: boolean;
    timeID: any;
}

class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    private node: Element;
    private containerNode: HTMLDivElement;

    constructor(props) {
        super(props);
        this.state = {
            clientX: 0,
            clientY: 0,
            isVisible: false,
            timeID: null,
        };
    }

    componentDidMount() {
        const { showComponent } = this.props;
        this.node = findDOMNode(showComponent) as Element;

        ['mouseover', 'mousemove'].forEach(event => {
            this.node.addEventListener(event, this.componentOver);
        });
        this.node.addEventListener('mouseleave', this.componentLeave);
    }

    componentWillUnmount() {
        this.destroy();
    }

    componentOver = event => {
        let { timeID } = this.state;
        if (timeID) {
            clearTimeout(timeID);
        }
        timeID = setTimeout(() => {
            const { clientX, clientY } = event;

            this.setState(state => ({
                clientX: clientX + 4,
                clientY: clientY + 4,
                isVisible: true,
            }));
        }, 100);
        this.setState({ timeID });
    };

    componentLeave = () => {
        let { timeID } = this.state;
        if (timeID) {
            clearTimeout(timeID);
        }
        this.setState(state => ({
            isVisible: false,
            timeID: null,
        }));
    };

    destroy = () => {
        if (this.node) {
            ['mouseover', 'mousemove'].forEach(event => {
                this.node.removeEventListener(event, this.componentOver);
            });
            this.node.removeEventListener('mouseleave', this.componentLeave);
        }
        document.body.removeChild(this.containerNode);
    };

    render() {
        const { clientX, clientY, isVisible } = this.state;

        const computeStyle: React.CSSProperties = {
            left: clientX,
            top: clientY,
            visibility: isVisible ? 'visible' : 'hidden',
        };

        if (!this.containerNode) {
            this.containerNode = document.createElement('div');
            document.body.appendChild(this.containerNode);
        }

        const content = (
            <div className="bxu-tooltip" style={computeStyle}>
                {this.props.children}
            </div>
        );

        return ReactDOM.createPortal(content, this.containerNode);
    }
}

export default Tooltip;
