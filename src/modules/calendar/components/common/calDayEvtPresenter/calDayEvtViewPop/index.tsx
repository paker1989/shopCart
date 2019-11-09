import * as React from 'react';

import CalPopover from '../../calPopover';
import { CalendarNS } from '../../../../utils/types';
import CalDaycalDayEvtViewContent from './content';
import * as PopActionCreator from '../../../../store/action/popAction';
import WindowFrozener from '../../windowFrozener';
import ClickOutSider from '../../clickOutSider';
import { connect } from 'react-redux';
import { CalendarRedux } from '../../../../utils/reduxTypes';
import calEventPresenterManager from '../../calEventPresenterManager';

import './calDayEvtViewPop.scss';

export interface CalDayEvtViewPopProps
    extends CalendarNS.ICalPopoverCommonProps {
    updateViewProps?: (viewProps: CalendarRedux.IViewPropStats) => void;
}

const mapDispatchToProps = dispatch => ({
    updateViewProps: (viewProps: CalendarRedux.IViewPropStats) =>
        dispatch(PopActionCreator.updateViewPopProps(viewProps)),
});

class CalDayEvtViewPop extends CalPopover<CalDayEvtViewPopProps> {
    private self: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.self = React.createRef();
    }

    componentDidUpdate(prevProps: CalDayEvtViewPopProps) {
        if (prevProps.id !== this.props.id) {
            this.self.current.style.height = '';
            setTimeout(() => {
                this.adjustPosition();
            }, 0);
        }
    }

    getContainer = () => {
        return this.self ? this.self.current : null;
    };

    render() {
        const { zIndex, id, updateViewProps } = this.props;
        const { style } = this.state;
        const item = calEventPresenterManager.getSelectedItem();

        const wrapperStyle: React.CSSProperties = {
            ...style,
            zIndex,
        };
        return (
            <div
                className="caldayEvtView-pop"
                style={wrapperStyle}
                id={id}
                ref={this.self}
            >
                <CalDaycalDayEvtViewContent item={item} />
                <WindowFrozener
                    getContainer={this.getContainer}
                    allowScroll={true}
                />
                <ClickOutSider
                    getContainer={this.getContainer}
                    cb={() => {
                        updateViewProps({
                            viewShowPop: false,
                            viewPopId: null,
                        });
                    }}
                />
            </div>
        );
    }
}

export default connect(
    () => ({}),
    mapDispatchToProps
)(CalDayEvtViewPop);
