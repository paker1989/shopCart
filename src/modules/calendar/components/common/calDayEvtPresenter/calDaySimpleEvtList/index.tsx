import * as React from 'react';
import { useState } from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';

import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';

import './calDaySimpleEvtList.scss';
import CalDayCompleteEvtPop from '../CalDayCompleteEvtPop';

export interface ICalDaySimpleEvtListProps {
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    maxPreview?: number;
}

export default (props: ICalDaySimpleEvtListProps) => {
    const { evts, maxPreview } = props;
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = useSortedEvtList(
        evts
    );
    const previewList = maxPreview
        ? sortedList.slice(0, maxPreview)
        : sortedList;

    const nbMore = sortedList.length - previewList.length;

    const onSelectItem = (selectedIndex: number) => {
        setSelectedIndex(selectedIndex);
    };

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
                <div className="caldayEvt-simple-list__more">
                    <FormattedMessage
                        id="cal.moreResults"
                        values={{ nbMore }}
                    />
                </div>
            )}
            {selectedIndex !== -1 && (
                <CalDayCompleteEvtPop item={previewList[selectedIndex]} />
            )}
        </div>
    );
};
