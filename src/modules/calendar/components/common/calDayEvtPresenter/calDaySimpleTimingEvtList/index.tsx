import * as React from 'react';
import { useState, useEffect } from 'react';

import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';
import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import CalDayCompleteEvtPop from '../calDayCompleteEvtPop';
import Positionner from '../../position';
import calEventPresenterManager from '../../calEventPresenterManager';

import './calDaySimpleTimingEvtList.scss';
import {
    getDBTimingFromTimingItem,
    convertDBTimingToTimRange,
    isTimeRangeDoubled,
} from '../../../../utils/timeRangeHelper';

export interface ICaldaySimpleTimingEvtListProps {
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    minSplitterHeight: number;
}

const CaldaySimpleTimingEvtList = (props: ICaldaySimpleTimingEvtListProps) => {
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
    let stIndexArray;
    let stIndex;
    return (
        <div className="caldayEvt-timing-list">
            {sortedList.map((sortedEvt, index) => {
                evtTimeRange = convertDBTimingToTimRange(
                    getDBTimingFromTimingItem(sortedEvt)
                );
                stIndexArray = sortedList
                    .filter(item => {
                        const itemTimeRange = convertDBTimingToTimRange(
                            getDBTimingFromTimingItem(item)
                        );
                        return isTimeRangeDoubled(evtTimeRange, itemTimeRange);
                    })
                    .map((item, index) => index);
                stIndex = stIndexArray.indexOf(index);
                console.log(
                    ' index = ' +
                        index +
                        '; stIndexArray = ' +
                        JSON.stringify(stIndexArray)
                );
                console.log('stIndex = ' + stIndex);
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

export default CaldaySimpleTimingEvtList;
