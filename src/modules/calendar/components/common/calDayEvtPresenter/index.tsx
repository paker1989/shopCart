import * as React from 'react';
import { createPortal } from 'react-dom';

import CalPopover from '../calPopover';
import Position from '../position';
import DayEvtPresenterContent from './content';
import WindowEventHandler from '../../../../../_packages_/utils/components/windowEventHandler';
import WindowResizeHandler from '../../../../../_packages_/utils/components/windowResizeHandler';

import './dayEvtPresenter.scss';
import { CalendarNS } from '../../../utils/types';
import { isSameDay } from '../../../../../_packages_/components/datePicker/common/util';

class DayEvtPresenter extends CalPopover<CalendarNS.ICalEventPresenterProps> {
    private self: React.RefObject<HTMLDivElement>;

    static defaultProps = {
        positionner: Position.autoAside,
    };

    constructor(props) {
      super(props);
      this.self = React.createRef();
    }

    // componentDidUpdate(prevProps) {
    //     if (!isSameDay(prevProps.date, this.props.date)) {
    //         this.updatePosition();
    //     }
    // }

    updatePosition = () => {
      if (!this.self || !this.self.current) {
          return;
      }
      this.self.current.style.height = '';
      setTimeout(() => {
          this.adjustPosition();
      }, 0);
    }

    render() {
        const { containerNode, zIndex, id, ...otherProps } = this.props;
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
                ref={this.self}
            >
                <DayEvtPresenterContent {...otherProps} updatePosition={this.updatePosition}/>
                <WindowResizeHandler onResize={this.onWindowResize} />
                <WindowEventHandler
                    eventName="scroll"
                    callbackFn={this.onWindowScroll}
                />
            </div>
        );

        return containerNode
            ? createPortal(presenterContent, containerNode)
            : presenterContent;
    }
}

export default DayEvtPresenter;
