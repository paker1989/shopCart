import * as React from 'react';
import { useState, useEffect } from 'react';

import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';
import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import CalDayCompleteEvtPop from '../calDayCompleteEvtPop';
import Positionner from '../../position';
import calEventPresenterManager from '../../calEventPresenterManager';

import './calDaySimpleTimingEvtList.scss';

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

    return (
        <div className="caldayEvt-timing-list">
            {sortedList.map((sortedEvt, index) => {
                return (
                    <CalDaySimpleEvtItem
                        selected={index === selectedIndex}
                        onSelect={onSelectItem}
                        item={sortedEvt}
                        key={index}
                        index={index}
                        minSplitterHeight={minSplitterHeight}
                        type="timing"
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
