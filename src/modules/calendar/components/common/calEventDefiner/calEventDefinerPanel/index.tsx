import * as React from 'react';

import { CalendarNS } from '../../../../utils/types';
import './calEventDefinePanel.scss';

export interface ICalEventDefinerPanelProps {
  timeRange?: CalendarNS.ITimeRangeFormat;
}
class CalEventDefinerPanel extends React.Component<ICalEventDefinerPanelProps, any> {
  render() {
    return (
      <div className="calevent-definer-panel">
       
      </div>
    );
  }
}

export default CalEventDefinerPanel;