import * as React from 'react';
import { useState, useEffect } from 'react';

import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';
import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import CalDayCompleteEvtPop from '../calDayCompleteEvtPop';
import Positionner from '../../position';
import calEventPresenterManager from '../../calEventPresenterManager';

import './calDaySimpleTimingActivityList.scss';
import {
    getDBTimingFromTimingItem,
    convertDBTimingToTimRange,
    isTimeRangeDoubled,
} from '../../../../utils/timeRangeHelper';

export interface ICaldaySimpleTimingActivityListProps {
    evts: CalEvtDataNS.ICalEvtCompleteActivityDataModel[];
    minSplitterHeight: number;
}

const CalDaySimpleTimingActivityList = (
    props: ICaldaySimpleTimingActivityListProps
) => {
    const { evts, minSplitterHeight } = props;
    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = evts
        ? useSortedEvtList(evts)
        : [];
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [dragNode, setDragNode] = useState(null);
    const [popId, setPopId] = useState(calEventPresenterManager.getId());

    useEffect(() => {
        setPopId(calEventPresenterManager.getId());
    }, [selectedIndex]);

    const onSelectItem = (selectedIndex: number, refObj: HTMLDivElement) => {
        setSelectedIndex(selectedIndex);
        setDragNode(refObj);
    };

    let evtTimeRange;
    let stIdArray;
    let stIndex;
    let ownId;
    return (
        <div className="caldayEvt-timing-list">
            {sortedList.map((sortedEvt, index) => {
                ownId = (sortedEvt as CalEvtDataNS.ICalEvtCompleteActivityDataModel)
                    .id;
                evtTimeRange = convertDBTimingToTimRange(
                    getDBTimingFromTimingItem(sortedEvt)
                );
                stIdArray = sortedList
                    .filter(item => {
                        const itemTimeRange = convertDBTimingToTimRange(
                            getDBTimingFromTimingItem(item)
                        );
                        return isTimeRangeDoubled(evtTimeRange, itemTimeRange);
                    })
                    .map(
                        item =>
                            (item as CalEvtDataNS.ICalEvtCompleteActivityDataModel)
                                .id
                    );
                stIndex = stIdArray.length <= 1 ? -1 : stIdArray.indexOf(ownId);

                return (
                    <CalDaySimpleEvtItem
                        selected={index === selectedIndex}
                        onSelect={onSelectItem}
                        item={sortedEvt}
                        key={index}
                        index={index}
                        minSplitterHeight={minSplitterHeight}
                        type="timing"
                        stIndex={stIndex}
                        stArrayLenth={stIdArray.length}
                    />
                );
            })}
            {selectedIndex !== -1 && (
                <CalDayCompleteEvtPop
                    zIndex={1111}
                    asideCurshion={10}
                    topCurshion={30}
                    bottomCurshion={30}
                    id={popId}
                    dragPopNode={dragNode}
                    item={sortedList[selectedIndex]}
                    positionner={Positionner.autoAside}
                />
            )}
        </div>
    );
};

export default CalDaySimpleTimingActivityList;
