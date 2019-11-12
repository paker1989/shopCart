import * as React from 'react';
import throttle from 'lodash/throttle';

import CalPopover from '../../calPopover';
import { CalendarNS } from '../../../../utils/types';
import CalDaycalDayEvtViewContent from './content';
import * as PopActionCreator from '../../../../store/action/popAction';
import * as EvtActionCreator from '../../../../store/action/evtsAction';
import WindowFrozener from '../../windowFrozener';
import ClickOutSider from '../../clickOutSider';
import { connect } from 'react-redux';
import { CalendarRedux } from '../../../../utils/reduxTypes';
import calEventPresenterManager from '../../calEventPresenterManager';
import WindowResizeHandler from '../../../../../../_packages_/utils/components/windowResizeHandler';

import './calDayEvtViewPop.scss';

export interface CalDayEvtViewPopProps
    extends CalendarNS.ICalPopoverCommonProps {
    updateViewProps?: (viewProps: CalendarRedux.IViewPropStats) => void;
    deleteEvt?:  (id: any, type: string) => void;
}

const mapDispatchToProps = dispatch => ({
    updateViewProps: (viewProps: CalendarRedux.IViewPropStats) =>
        dispatch(PopActionCreator.updateViewPopProps(viewProps)),
    deleteEvt: (id: any, type: string) =>
        dispatch(EvtActionCreator.deleteEvt(id, type)),
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

    onResize = throttle(() => {
        this.self.current.style.height = '';
        setTimeout(() => {
            this.adjustPosition();
        }, 0);
    }, 500);

    onClose = () => {
        this.props.updateViewProps({
            viewShowPop: false,
            viewPopId: null,
        });
    };

    onDelete = () => {
        const item = calEventPresenterManager.getSelectedItem();
        
        this.props.deleteEvt(item, item.type);
        this.onClose();
    }

    render() {
        const { zIndex, id } = this.props;
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

                <CalDaycalDayEvtViewContent item={item} onClose={this.onClose}/>
                <WindowFrozener
                    getContainer={this.getContainer}
                    allowScroll={true}
                />
                <WindowResizeHandler onResize={this.onResize} />
                <ClickOutSider
                    getContainer={this.getContainer}
                    cb={this.onClose}
                />
            </div>
        );
    }
}

export default connect(
    () => ({}),
    mapDispatchToProps
)(CalDayEvtViewPop);
