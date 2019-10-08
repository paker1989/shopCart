import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import Positionner from '../../position';
import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';
import CalDayCompleteEvtPop from '../calDayCompleteEvtPop';
import calEventPresenterManager from '../../calEventPresenterManager';

import './calDaySimpleEvtList.scss';

export interface ICalDaySimpleEvtListProps {
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    maxPreview?: number;
}

export default (props: ICalDaySimpleEvtListProps) => {
    const { evts, maxPreview } = props;
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [dragNode, setDragNode] = useState(null);
    const [popId, setPopId] = useState(calEventPresenterManager.getId());
    const nbMoreRef = useRef(null);
    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = useSortedEvtList(
        evts
    );
    const previewList =
        (maxPreview && maxPreview < sortedList.length)
            ? sortedList.slice(0, maxPreview)
            : sortedList;

    const nbMore = sortedList.length - previewList.length;

    useEffect(() => {
        setPopId(calEventPresenterManager.getId());
    }, [selectedIndex]);

    const onSelectItem = (selectedIndex: number, refObj: HTMLDivElement) => {
        setSelectedIndex(selectedIndex);
        setDragNode(refObj);
    };

    const nbMoreClass = cx({
        ['caldayEvt-simple-list__more']: true,
        ['is-selected']: selectedIndex === previewList.length,
    });

    return (
        <div className="caldayEvt-simple-list">
            {evts.length === 0 ? (
                <div className="no-evt-placeholder">
                    <FormattedMessage id="cal.noEvts" />
                </div>
            ) : (
                <div className="caldayEvt-simple-list__activities">
                    {previewList.map((item, index) => (
                        <CalDaySimpleEvtItem
                            selected={index === selectedIndex}
                            onSelect={onSelectItem}
                            item={item}
                            key={index}
                            index={index}
                        />
                    ))}
                </div>
            )}
            {nbMore > 0 && (
                <div
                    ref={nbMoreRef}
                    className={nbMoreClass}
                    onClick={() => {
                        onSelectItem(
                            previewList.length,
                            nbMoreRef ? nbMoreRef.current : null
                        );
                    }}
                >
                    <FormattedMessage
                        id="cal.moreResults"
                        values={{ nbMore }}
                    />
                </div>
            )}
            {selectedIndex !== -1 && (
                <CalDayCompleteEvtPop
                    zIndex={1111}
                    asideCurshion={10}
                    topCurshion={30}
                    bottomCurshion={30}
                    id={popId}
                    dragPopNode={dragNode}
                    item={previewList[selectedIndex]}
                    positionner={Positionner.autoAside}
                />
            )}
        </div>
    );
};
