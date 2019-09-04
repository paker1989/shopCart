import * as React from 'react';
import { createPortal } from 'react-dom';
import { CalendarNS } from '../../../../utils/types';

import './calEventDefinerPop.scss';

export interface ICalEventDefinerPopProps {
    timeRange: CalendarNS.ITimeRangeFormat;
    zIndex?: number;
    containerNode: Element;
}

class CalEventDefinerPop extends React.Component<
    ICalEventDefinerPopProps,
    any
> {
    render() {
        const { containerNode } = this.props;

        const CalEventDefinerPopPanel = (
            <div className="calevent-define-pop-container"></div>
        );

        return createPortal(CalEventDefinerPopPanel, containerNode);
    }
}

export default CalEventDefinerPop;
