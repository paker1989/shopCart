import * as React from 'react';

import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';
import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';

import './calDaySimpleTimingEvtList.scss';

export interface ICaldaySimpleTimingEvtListProps {
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
}

const CaldaySimpleTimingEvtList = (props: ICaldaySimpleTimingEvtListProps) => {
    const { evts } = props;
    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = evts
    ? useSortedEvtList(evts)
    : [];

    return (
        <div className="caldayEvt-timing-list">
            {
              sortedList.map((sortedEvt, index) => {
                  return (
                    <CalDaySimpleEvtItem
                    selected={index === selectedIndex}
                    onSelect={onSelectItem}
                    item={item}
                    key={index}
                    index={index}
                />
                  );
              })
            }
        </div>
    )
}

export default CaldaySimpleTimingEvtList;