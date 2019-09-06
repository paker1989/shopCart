import * as React from 'react';

import CalInput from '../../calInput';
import ReminderDefiner from './reminderDefiner';
import ActivityDefiner from './activityDefiner';

import { CalendarNS } from '../../../../utils/types';

import './calEventDefinePanel.scss';

export interface ICalEventDefinerPanelProps {
  timeRange?: CalendarNS.ITimeRangeFormat;
}
class CalEventDefinerPanel extends React.Component<ICalEventDefinerPanelProps, any> {
  render() {
    return (
      <div className="calevent-definer-panel">
         <div className="calevent-definer-panel__title">
           <CalInput placeholder="添加标题"/>
         </div>
         <div className="calevent-definer-panel__type">
         </div>
         <div className="calevent-definer-panel__options">
            {/* <ReminderDefiner/>
            <ActivityDefiner/> */}
         </div>
         <div className="calevent-definer-panel__actions">
         </div>
      </div>
    );
  }
}

export default CalEventDefinerPanel;