import * as React from 'react';
import { connect } from 'react-redux';

import Position from '../common/position';
import CalDayEvtViewPop from '../common/calDayEvtPresenter/calDayEvtViewPop';
import calEventPresenterManager from '../common/calEventPresenterManager';

const mapStateToProps = state => ({
    viewShowPop: state.popReducers.viewShowPop,
    viewPositionner: state.popReducers.viewPositionner,
    viewTopCurshion: state.popReducers.viewTopCurshion,
    viewBottomCurshion: state.popReducers.viewBottomCurshion,
    viewAsideCurshion: state.popReducers.viewAsideCurshion,
    viewPopId: state.popReducers.viewPopId,
    viewItemId: state.popReducers.viewItemId,
    viewItemDateKey: state.popReducers.viewItemDateKey,
});

class ViewPopHandler extends React.Component<any, any> {
    render() {
        const {
            viewShowPop,
            viewPositionner,
            viewTopCurshion,
            viewBottomCurshion,
            viewAsideCurshion,
            viewPopId,
        } = this.props;

        const evtTriggerNode = calEventPresenterManager.getEvtTriggerNode();

        return (
            <React.Fragment>
                {viewShowPop && evtTriggerNode && (
                    <CalDayEvtViewPop
                        dragPopNode={evtTriggerNode}
                        asideCurshion={viewAsideCurshion}
                        bottomCurshion={viewBottomCurshion}
                        topCurshion={viewTopCurshion}
                        id={viewPopId}
                        positionner={Position[viewPositionner]}
                    ></CalDayEvtViewPop>
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(ViewPopHandler);
