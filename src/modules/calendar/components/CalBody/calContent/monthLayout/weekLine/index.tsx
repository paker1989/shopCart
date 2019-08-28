import * as React from 'react';

import './weekLine.scss';

export interface IWeekLineProps {
  weekLabels?: string[]
}

const _test_data_props = [];

class WeekLine extends React.PureComponent<IWeekLineProps, any> {

    render() {
        return (
          <div className="weekLine-container">

          </div>
        );
    }
}

export default WeekLine;
