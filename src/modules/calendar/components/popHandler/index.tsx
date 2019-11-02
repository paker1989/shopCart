import * as React from 'react';
import { connect } from 'react-redux';
import { CalendarNS } from '../../utils/types';
import CalEventDefinerManager from '../common/calEventDefiner';
import CalEventDefinerPop from '../common/calEventDefiner/calEventDefinerPop';
import Position from '../common/position';
import { getPopupZIndexConst } from '../../utils/calZIndexManager';
import * as EvtsActionCreator from '../../store/action/evtsAction';

const mapStateToProps = state => ({
    defShowPop: state.popReducers.defShowPop,
    defTimeRange: state.popReducers.defTimeRange,
    defPositionner: state.popReducers.defPositionner,
    defTopCurshion: state.popReducers.defTopCurshion,
    defBottomCurshion: state.popReducers.defBottomCurshion,
    defPopId: state.popReducers.defPopId,
    initDayEvtValue: state.popReducers.initDayEvtValue,
    saveEvtStatus: state.evtsReducers.globalSaveStatus.status,
});

const mapDispatchToProps = dispatch => ({
    resetSaveEvtStatus: () => dispatch(EvtsActionCreator.resetSaveEvtStatus()),
});

class PopHandler extends React.Component<any, any> {
    componentDidUpdate(prevProps) {
        const { saveEvtStatus, resetSaveEvtStatus } = this.props;
        if (prevProps.saveEvtStatus === 'none' && saveEvtStatus === 'succeed') {
            //TO SHOW THE REVERT POP
            resetSaveEvtStatus();
        }
    }
    render() {
        const {
            defShowPop,
            defTimeRange,
            defPositionner,
            defTopCurshion,
            defBottomCurshion,
            defPopId,
            initDayEvtValue,
        } = this.props;

        let simulatedDragNode;
        let defDragNode;
        const currentDragNode = CalEventDefinerManager.getCurrentDragNode();

        if (
            currentDragNode &&
            (currentDragNode as CalendarNS.ISimuBoundingClientRect).left
        ) {
            simulatedDragNode = currentDragNode;
        } else {
            defDragNode = currentDragNode;
        }
        return (
            <React.Fragment>
                {defShowPop && (
                    <CalEventDefinerPop
                        timeRange={defTimeRange}
                        positionner={Position[defPositionner]}
                        topCurshion={defTopCurshion}
                        bottomCurshion={defBottomCurshion}
                        dragPopNode={defDragNode}
                        dragNodeClientRect={simulatedDragNode}
                        id={defPopId}
                        zIndex={getPopupZIndexConst()}
                        initDayEvtValue={initDayEvtValue}
                    ></CalEventDefinerPop>
                )}
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PopHandler);
