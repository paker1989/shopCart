-   evtsReducers 专门负责数据的交互:

```
  initState = {cachedEvts: []};
  cachedEvts: {'yymmdd': { evts, updateTiming }}
  calConfig.maxCache = 10;
```

-   每次 create or update evts, force `evtSaga`重新提取事件 and update `evtsReducers.initState`: updateTiming = Date.now().getTime()
-   如果`evtReducer.state.cachedEvts.length > 10`, then remove first and insert;
-   `calEvtPresenter` 监听 `evtsReducers.initState.cacheEvts[yymmdd]`:
    > if undefined, launch `evtSaga.getEvt`;
    > or, render


## monthLayout 数据加载
- `componentDidMount`: fetchMonthData, saga returns all evts data with `year=displayYear, month=displayMonth`, it updates `evtsReducers.calEvts` with `dateKey`. then in *SingledayGrid* it maps
`calEvts[dateKey]`;