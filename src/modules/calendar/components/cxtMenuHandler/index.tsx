import * as React from 'react';
import { connect } from 'react-redux';

import CalDayEvtContextMenu from '../common/calDayEvtPresenter/calDayEvtContextMenu';
import * as PopActionCreator from '../../store/action/popAction';
import { CalendarRedux } from '../../utils/reduxTypes';

const mapStateToProps = state => ({
    ctxMenuX: state.popReducers.ctxMenuX,
    ctxMenuY: state.popReducers.ctxMenuY,
    ctxMenuType: state.popReducers.ctxMenuType,
    ctxMenuEvtId: state.popReducers.ctxMenuEvtId,
    ctxMenuVisible: state.popReducers.ctxMenuVisible,
});

const mapDispatchToProps = dispatch => ({
    updateCxtMenuProps: (cxtMenuProps: CalendarRedux.ICxtMenuPropStats) =>
        dispatch(PopActionCreator.updateCxtMenuProps(cxtMenuProps)),
});

class CxtMenuHandler extends React.Component<any, any> {
    render() {
        const {
            ctxMenuX,
            ctxMenuY,
            ctxMenuType,
            ctxMenuEvtId,
            ctxMenuVisible,
            updateCxtMenuProps,
        } = this.props;

        const onVisibleChange = (visible: boolean) => {
            if (!visible) {
                updateCxtMenuProps({
                    ctxMenuEvtId: null,
                    ctxMenuVisible: false,
                });
            }
        };
        return (
            <React.Fragment>
                {ctxMenuVisible && (
                    <CalDayEvtContextMenu
                        ctxMenuX={ctxMenuX}
                        ctxMenuY={ctxMenuY}
                        ctxMenuType={ctxMenuType}
                        ctxMenuEvtId={ctxMenuEvtId}
                        onVisibleChange={onVisibleChange}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CxtMenuHandler);
