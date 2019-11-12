import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import assign from 'lodash/assign';

import { getDragPopZIndex } from '../../../utils/calZIndexManager';

import { CalendarNS } from '../../../utils/types';

import './calEventPop.scss';

export interface ICalEventProps {
    className?: string;
    popStyle?: {};
    getDragPopNode?: (ref: React.RefObject<HTMLDivElement>) => void;
    type?: CalendarNS.TCalEventPopDragStatusType; // dragging to define or defined event
    title?: string;
    content?: any;
}

const _test_bg_color = 'rgb(121, 134, 203)';

export default class CalendarEventPop extends React.Component<
    ICalEventProps,
    any
> {
    popRef?: React.RefObject<HTMLDivElement>;

    static defaultProps = {
        title: <FormattedMessage id="cal.noTitle" />,
        type: 'dragging',
    };

    constructor(props) {
        super(props);
        this.popRef = React.createRef();
    }

    componentDidMount() {
        const { getDragPopNode } = this.props;
        getDragPopNode && getDragPopNode(this.popRef);
    }

    render() {
        const { type, className, popStyle, title, content } = this.props;

        const modalClass = cx(
            {
                ['calevent-pop-container']: true,
                [`is-${type}`]: true,
            },
            className
        );

        const defaultModalStyle: React.CSSProperties = {
            position: 'absolute',
            background: _test_bg_color,
            zIndex: getDragPopZIndex(),
        };

        const wrapperStyle = popStyle
            ? assign(defaultModalStyle, popStyle)
            : defaultModalStyle;

        return (
            <div ref={this.popRef} className={modalClass} style={wrapperStyle}>
                <div className="calevent-pop-container__main">
                    <div className="calevent-pop-container__title no-select font-calEvent ">
                        {title}
                    </div>
                    <div className="calevent-pop-container__timeRange no-select font-calEvent ">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}
