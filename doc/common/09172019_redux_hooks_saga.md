redux-saga: 
-- all, takeEvery, takeLatest, put(action), call(fn, ...args), createSagaMiddleware(), connect to store,
yield Generator* function(), catch exception, 

hooks:
-- 各种实践, useEffect(, [[]]) -> simulate life cycle, if [] is not specified, then call every time. useRef(), useCallback(), useState(), 
react-use --> 各种库

react-redux:
-- combienReducers(...reducers): e.g. (reducer1, reducer2) --> return state.reducer1.prop...
- connect(mapStateToProps, mapDispatchToProps, mergeProps)(Class)
-- action : 实际action, 里面dispatch({ type, payload}), 然后reducers里switch type: return ({...states, item: action.payload})
- reducers
- applyMiddleware

react-redux with saga: 
- component: enrolLP -> mapDispatchToProps: enrolLp: (request) => dispatch(_ACTION_._ENROLL_LP, request);

- saga:  takeLatest(_ACTION_._ENROLL_LP, sagaFn);

mapDispatchToProps 就是一个 { actionName: (..args) => (dispatch) => {// todo }}

const mapDispatchToProps = dispatch => {
    return {
        setLPTab: (tab) => dispatch(lpSetTabAction.setLpTab(tab))
    };
};

const mapDispatchToProps = {
	name: () => dispatch => {
	
	}
}