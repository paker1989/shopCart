import * as React from 'react';
import { connect } from 'react-redux';
import CalDayEvtContextMenu from '../common/calDayEvtPresenter/calDayEvtContextMenu';

const mapStateToProps = state => ({
    ctxMenuX: state.popReducers.ctxMenuX,
    ctxMenuY: state.popReducers.ctxMenuY,
    ctxMenuType: state.popReducers.ctxMenuType,
    ctxMenuEvtId: state.popReducers.ctxMenuEvtId,
    ctxMenuVisible: state.popReducers.ctxMenuVisible,
});

class CxtMenuHandler extends React.Component<any, any> {
    render() {
        const {
            ctxMenuX,
            ctxMenuY,
            ctxMenuType,
            ctxMenuEvtId,
            ctxMenuVisible,
        } = this.props;

        return (
            <React.Fragment>
                {ctxMenuVisible && (
                    <CalDayEvtContextMenu
                        ctxMenuX={ctxMenuX}
                        ctxMenuY={ctxMenuY}
                        ctxMenuType={ctxMenuType}
                        ctxMenuEvtId={ctxMenuEvtId}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(CxtMenuHandler);
