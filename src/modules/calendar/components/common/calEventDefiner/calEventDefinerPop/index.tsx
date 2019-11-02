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

    constructor(props) {
        super(props);
        this.state = { style: {}, edited: false };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.adjustPosition();
        }
    }

    onClose = () => {
        const { edited } = this.state;

        if (edited) {
            CalModalManager.initModal(this.props.locale, CalConfirmPanel, {
                visible: true,
                isClose: false,
                contentClass: 'cal-confirm-panel-wrapper',
                componentProps: {
                    onDiscardChange: this.onDiscardChange,
                },
            });
        } else {
            this.onDiscardChange();
        }
    };

    onDiscardChange = () => {
        this.props.updateDefPop({
            defTimeRange: null,
            globalInitStatus: 'stop',
            defShowPop: false,
            initDayEvtValue: false,
        });
    };

    render() {
        const {
            containerNode,
            id,
            zIndex,
            timeRange,
            initDayEvtValue,
            onSave,
            beforeSave,
            afterSave,
        } = this.props;
        const { style, edited } = this.state;
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
                        edited={edited}
                        setEdited={() => {
                            this.setState({ edited: true });
                        }}
                        timeRange={timeRange}
                        initDayEvtValue={initDayEvtValue}
                        onSave={onSave}
                        beforeSave={beforeSave}
                        afterSave={afterSave}
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
