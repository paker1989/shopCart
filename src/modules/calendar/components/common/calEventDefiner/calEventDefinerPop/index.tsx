import * as React from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

import CalPopover from '../../calPopover';
import CalEventDefinerPanel from '../calEventDefinerPanel';
import CalModalManager from '../../calModalManager';
import CalConfirmPanel from '../../calConfirmPanel';
import * as PopActionCreator from '../../../../store/action/popAction';
import WindowEventHandler from '../../../../../../_packages_/utils/components/windowEventHandler';
import WindowResizeHandler from '../../../../../../_packages_/utils/components/windowResizeHandler';
import Position from '../../position';

import { CalendarNS } from '../../../../utils/types';

import './calEventDefinerPop.scss';
import { CalendarRedux } from '../../../../utils/reduxTypes';

// const _test_time_range = {
//     from: { dayAt: new Date(), hourAt: 12, minAt: 0 },
//     to: { dayAt: new Date(), hourAt: 15, minAt: 0 },
// };

const mapStateToProps = state => ({
    locale: state.layoutReducers.locale,
});

const mapDispatchToProps = dispatch => ({
    updateDefPop: (defProps: CalendarRedux.IDefinerPopStats) =>
        dispatch(PopActionCreator.updateDefinerPop(defProps)),
});

class CalEventDefinerPop extends CalPopover<
    CalendarNS.ICalEventDefinerPopProps
> {
    static defaultProps = {
        positionner: Position.autoMiddle,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.adjustPosition();
        }
    }

    onClose = () => {
        CalModalManager.initModal(this.props.locale, CalConfirmPanel, {
            visible: true,
            isClose: false,
            contentClass: 'cal-confirm-panel-wrapper',
            componentProps: {
                onDiscardChange: this.onDiscardChange,
            },
        });
    };

    onDiscardChange = () => {
        this.props.updateDefPop({
            defTimeRange: null,
            globalInitStatus: 'stop',
            defShowPop: false
        });
    };

    render() {
        const {
            containerNode,
            id,
            zIndex,
            timeRange,
            initDayEvtValue,
        } = this.props;
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
            >
                <div className="calevent-define-pop-container__body">
                    <div
                        className="calevent-define-pop-container__close"
                        onClick={this.onClose}
                    >
                        <div className="calevent-define-pop-container__close--wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                    <CalEventDefinerPanel
                        timeRange={timeRange}
                        initDayEvtValue={initDayEvtValue}
                    />
                </div>
                <WindowResizeHandler onResize={this.onWindowResize} />
                <WindowEventHandler
                    eventName="scroll"
                    callbackFn={this.onWindowScroll}
                />
            </div>
        );
        return containerNode
            ? createPortal(CalEventDefinerPopPanel, containerNode)
            : CalEventDefinerPopPanel;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalEventDefinerPop);
