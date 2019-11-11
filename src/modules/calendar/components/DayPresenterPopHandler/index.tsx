import * as React from 'react';
import { connect } from 'react-redux';

import Position from '../common/position';
import CalDayEvtPresenter from '../../components/common/calDayEvtPresenter';
import calEventPresenterManager from '../common/calEventPresenterManager';

const mapStateToProps = state => ({
    dayPresenterShowPop: state.popReducers.dayPresenterShowPop,
    dayPresenterPositionner: state.popReducers.dayPresenterPositionner,
    dayPresenterTopCurshion: state.popReducers.dayPresenterTopCurshion,
    dayPresenterBottomCurshion: state.popReducers.dayPresenterBottomCurshion,
    dayPresenterAsideCurshion: state.popReducers.dayPresenterAsideCurshion,
    dayPresenterPopId: state.popReducers.dayPresenterPopId,
    dayPresenterDate: state.popReducers.dayPresenterDate,
});

class DayPresenterPopHandler extends React.Component<any, any> {
    render() {
        const {
            dayPresenterShowPop,
            dayPresenterPositionner,
            dayPresenterTopCurshion,
            dayPresenterBottomCurshion,
            dayPresenterAsideCurshion,
            dayPresenterPopId,
            dayPresenterDate,
        } = this.props;

        const evtTriggerNode = calEventPresenterManager.getEvtTriggerNode();

        return (
            <React.Fragment>
                {dayPresenterShowPop && evtTriggerNode && (
                    <CalDayEvtPresenter
                        dragPopNode={evtTriggerNode}
                        asideCurshion={dayPresenterAsideCurshion}
                        bottomCurshion={dayPresenterBottomCurshion}
                        topCurshion={dayPresenterTopCurshion}
                        positionner={Position[dayPresenterPositionner]}
                        date={dayPresenterDate}
                        id={dayPresenterPopId}
                        showClose={false}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(DayPresenterPopHandler);
