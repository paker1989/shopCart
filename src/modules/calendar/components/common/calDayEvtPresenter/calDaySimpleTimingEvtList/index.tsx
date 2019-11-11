import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';
import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import calEventPresenterManager from '../../calEventPresenterManager';
import * as PopActionCreator from '../../../../store/action/popAction';
import {
    getDBTimingFromTimingItem,
    convertDBTimingToTimRange,
    isTimeRangeDoubled,
} from '../../../../utils/timeRangeHelper';
import { getIdFromSortedEvt } from '../../../../utils/eventUtils';

import './calDaySimpleTimingEvtList.scss';

export interface ICaldaySimpleTimingEvtListProps {
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    minSplitterHeight: number;
}

const CalDaySimpleTimingEvtList = (
    props: ICaldaySimpleTimingEvtListProps
) => {
    const { evts, minSplitterHeight } = props;
    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = evts
        ? useSortedEvtList(evts)
        : [];
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showEvtView, setShowEvtView] = useState(false);
    const showViewPop = useSelector(
        (state: any) => state.popReducers.viewShowPop
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (!showViewPop && showEvtView) {
            setShowEvtView(false);
        }
    }, [showViewPop]);

    const onSelectItem = (
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
        newIndex: number,
        refObj: HTMLDivElement
    ) => {
        evt.stopPropagation();
        evt.nativeEvent.stopImmediatePropagation();

        if (showEvtView && selectedIndex === newIndex) {
            dispatch(
                PopActionCreator.updateViewPopProps({
                    viewShowPop: false,
                    viewPopId: null,
                })
            );
            setShowEvtView(false);
        } else {
            if (!showEvtView) {
                setShowEvtView(true);
            }
            setSelectedIndex(newIndex);
            const selectedItem = sortedList[newIndex];
            calEventPresenterManager.setEvtTriggerNode(refObj);
            calEventPresenterManager.setSelectedItem(selectedItem);
            dispatch(
                PopActionCreator.updateViewPopProps({
                    viewAsideCurshion: 10,
                    viewTopCurshion: 10,
                    viewBottomCurshion: 10,
                    viewPopId: calEventPresenterManager.getId(),
                    viewPositionner: 'autoAside',
                    viewShowPop: true,
                })
            );
        }
    };

    let evtTimeRange;
    let stIdArray;
    let stIndex;
    let ownId;

    return (
        <div className="caldayEvt-timing-list">
            {sortedList.map((sortedEvt, index) => {
                ownId = getIdFromSortedEvt(sortedEvt);
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
                    .map(item => getIdFromSortedEvt(item));
                stIndex = stIdArray.length <= 1 ? -1 : stIdArray.indexOf(ownId);

                return (
                    <CalDaySimpleEvtItem
                        selected={index === selectedIndex}
                        onSelect={onSelectItem}
                        item={sortedEvt}
                        key={ownId}
                        index={index}
                        minSplitterHeight={minSplitterHeight}
                        type="timing"
                        stIndex={stIndex}
                        stArrayLenth={stIdArray.length}
                    />
                );
            })}
        </div>
    );
};

export default CalDaySimpleTimingEvtList;
