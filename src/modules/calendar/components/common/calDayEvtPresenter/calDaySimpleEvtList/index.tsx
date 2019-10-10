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
    containerHeight?: number;
}

export default (props: ICalDaySimpleEvtListProps) => {
    const { evts, containerHeight } = props;
    const [maxDisplay, setMaxDisplay] = useState(-1);
    const [previewList, setPreviewList] = useState([]);
    const [nbMore, setNbMore] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [dragNode, setDragNode] = useState(null);
    const [popId, setPopId] = useState(calEventPresenterManager.getId());
    const nbMoreRef = useRef(null);

    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = evts
        ? useSortedEvtList(evts)
        : [];

    useEffect(() => {
        let res;
        if (maxDisplay < 0) {
            res = sortedList.slice(0);
        } else if (maxDisplay >= sortedList.length) {
            res = sortedList.slice(0, maxDisplay);
        } else {
            res = sortedList.slice(0, Math.max(maxDisplay - 1, 0));
        }
        setPreviewList(res);
        setNbMore(maxDisplay === 0 ? 0 : sortedList.length - res.length);
    }, [maxDisplay, sortedList]);

    useEffect(() => {
        console.log('try max display');
        console.log(containerHeight);
        console.log(sortedList.length);
        console.log('              ');
        if (!containerHeight || sortedList.length === 0) {
            return;
        }
        console.log('set max display');
        console.log(containerHeight);
        console.log(sortedList.length);
        console.log('              ');

        setMaxDisplay(Math.floor(containerHeight / 22));
    }, [containerHeight, sortedList.length]);

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
