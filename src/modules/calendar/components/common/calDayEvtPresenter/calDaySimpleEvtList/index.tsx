import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import CalDaySimpleEvtItem from '../calDaySimpleEvtItem';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import useSortedEvtList from '../../../../utils/hooks/useSortedEvtList';

import './calDaySimpleEvtList.scss';

export interface ICalDaySimpleEvtListProps {
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    maxPreview?: number;
}

export default (props: ICalDaySimpleEvtListProps) => {
    const { evts, maxPreview } = props;
    const sortedList: CalEvtDataNS.ICalEvtSortedItemType[] = useSortedEvtList(
        evts
    );
    const previewList = maxPreview
        ? sortedList.slice(0, maxPreview)
        : sortedList;

    return (
        <div className="caldayEvt-simple-list">
            {evts.length === 0 ? (
                <div className="">
                    <FormattedMessage id="cal.noEvts" />
                </div>
            ) : (
                <div className="caldayEvt-simple-list__activities">
                    {previewList.map((item, index) => (
                        <CalDaySimpleEvtItem item={item} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};
