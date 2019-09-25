import * as React from 'react';
import { CalEvtDataNS } from '../../../../utils/evtTypes';

export interface ICalDaySimpleEvtListProps {
  evts: CalEvtDataNS.ICalEvtSimpleDataModel[];
}

export default (props: ICalDaySimpleEvtListProps) => {
    const { evts } = props;
    console.log(evts);
    return (
        <div className="cal-dayEvt-simple-list">
           
        </div>
    )
}