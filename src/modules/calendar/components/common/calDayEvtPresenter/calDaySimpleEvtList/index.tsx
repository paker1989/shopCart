import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import isNumber from 'lodash/isNumber';

import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';
import calEventPresenterManager from '../../calEventPresenterManager';
import * as PopActionCreator from '../../../../store/action/popAction';

import './calDaySimpleEvtList.scss';

export interface ICalDaySimpleEvtListProps {
    seletedDate: Date;
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    containerHeight?: number;
    nbDisplayEvt?: number;
    showNoEvtReminder?: boolean;
    updateSortedEvtsLength?: (nbSortedEvts: number) => void;
    popAnchorId?: string; // indicate the pop id which contains current list; (pop case)
}

const CalDaySimpleEvtList = (props: ICalDaySimpleEvtListProps) => {
    const {
        seletedDate,
        evts,
        containerHeight,
        nbDisplayEvt,
        showNoEvtReminder,
        updateSortedEvtsLength,
        popAnchorId,
    } = props;

    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = evts
        ? useSortedEvtList(evts)
        : [];
    const [maxDisplay, setMaxDisplay] = useState(
        isNumber(nbDisplayEvt) ? nbDisplayEvt : -1
    );
    const [previewList, setPreviewList] = useState([]);
    const [nbMore, setNbMore] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const nbMoreRef = useRef(null);
    const [showEvtView, setShowEvtView] = useState(false);
    const showViewPop = useSelector(
        (state: any) => state.popReducers.viewShowPop
    );
    const [showDayPresenter, setShowDayPresenter] = useState(false);
    const showDayPresenterPop = useSelector(
        (state: any) => state.popReducers.dayPresenterShowPop
    );
    const dispatch = useDispatch();

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
        if (!containerHeight || sortedList.length === 0) {
            return;
        }
        setMaxDisplay(Math.max(Math.floor(containerHeight / 22), 0));
    }, [containerHeight, sortedList.length]);

    useEffect(() => {
        if (updateSortedEvtsLength) {
            updateSortedEvtsLength(sortedList.length);
        }
    }, [sortedList.length]);

    useEffect(() => {
        if (isNumber(nbDisplayEvt)) {
            setMaxDisplay(nbDisplayEvt);
        }
    }, [nbDisplayEvt]);

    useEffect(() => {
        if (!showViewPop && showEvtView) {
            setShowEvtView(false);
        }
    }, [showViewPop]);

    useEffect(() => {
        if (!showDayPresenterPop && showDayPresenter) {
            setShowDayPresenter(false);
        }
    }, [showDayPresenterPop]);

    const showMore = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        evt.stopPropagation();
        evt.nativeEvent.stopImmediatePropagation();

        if (showDayPresenter) {
            dispatch(
                PopActionCreator.updateDayPresenterPopProps({
                    dayPresenterShowPop: false,
                    dayPresenterPopId: null,
                })
            );
            setShowDayPresenter(false);
            return;
        }

        setShowDayPresenter(true);
        calEventPresenterManager.setEvtTriggerNode(nbMoreRef.current);
        dispatch(
            PopActionCreator.updateDayPresenterPopProps({
                dayPresenterShowPop: true,
                dayPresenterPopId: calEventPresenterManager.getId(),
                dayPresenterAsideCurshion: 10,
                dayPresenterBottomCurshion: 10,
                dayPresenterTopCurshion: 10,
                dayPresenterPositionner: 'autoAside',
                dayPresenterDate: seletedDate,
            })
        );
    };

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
            return;
        }

        if (!showEvtView) {
            setShowEvtView(true);
        }
        setSelectedIndex(newIndex);
        const selectedItem = previewList[newIndex];
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
                viewReferredPopId: popAnchorId,
            })
        );
    };

    const nbMoreClass = cx({
        ['caldayEvt-simple-list__more']: true,
        ['is-selected']: selectedIndex === previewList.length,
    });

    return (
        <div className="caldayEvt-simple-list">
            {evts.length === 0 ? (
                showNoEvtReminder && (
                    <div className="no-evt-placeholder">
                        <FormattedMessage id="cal.noEvts" />
                    </div>
                )
            ) : (
                <div className="caldayEvt-simple-list__activities">
                    {previewList.map((item, index) => (
                        <CalDaySimpleEvtItem
                            selected={index === selectedIndex}
                            onSelect={onSelectItem}
                            item={item}
                            key={index}
                            index={index}
                            referredPopId={popAnchorId}
                        />
                    ))}
                </div>
            )}
            {nbMore > 0 && (
                <div
                    ref={nbMoreRef}
                    className={nbMoreClass}
                    onMouseDown={e => {
                        e.stopPropagation();
                    }}
                    onClick={showMore}
                >
                    <FormattedMessage
                        id="cal.moreResults"
                        values={{ nbMore }}
                    />
                </div>
            )}
        </div>
    );
};

CalDaySimpleEvtList.defaultProps = {
    showNoEvtReminder: false,
    type: 'simple',
};

export default CalDaySimpleEvtList;
