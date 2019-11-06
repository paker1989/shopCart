import * as React from 'react';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';

export interface IActivityViewDetailProps {
    activity: CalEvtDataNS.ICalEvtCompleteActivityDataModel;
}

const ActivityViewDetail = (props: IActivityViewDetailProps) => {
    const { activity } = props;
    return <div className="activity-view">{activity.title}</div>;
};

export default ActivityViewDetail;
