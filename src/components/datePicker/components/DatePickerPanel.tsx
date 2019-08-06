import * as React from 'react';

import SimpleDateGrid from './SimpleDateGrid';

import DatePickers from '../common/types';
import { getMonthData } from '../common/util';

class DatePickerPanel extends React.Component
    <DatePickers.IDatePickerPanelProps, DatePickers.IDatePickerPanelStates> {

    static populateDisplay(date: Date): DatePickers.IDatePickerPanelStates {
        const displayYear: number = date.getFullYear();
        const displayMonth: number = date.getMonth();
        const monthData: DatePickers.IMonthDataFormat[] = getMonthData(displayYear, displayMonth);

        return { displayYear, displayMonth, monthData };
    }

    constructor(props) {
        super(props);
        const { displayYear, displayMonth, monthData } = DatePickerPanel.populateDisplay(new Date());
        this.state = { displayYear, displayMonth, monthData };
    }

    render() {
        const {
            prefix
        } = this.props;

        const { monthData, displayMonth, displayYear } = this.state;

        let DatePickerHeader: React.FunctionComponent = () => (
            <div className={`${prefix}-datepicker-header`}>
                <div className={`${prefix}-header-title`}>
                    {`${displayYear}年${displayMonth}月`}
                </div>
                <div className={`${prefix}-header-action`}>
                    <span>{`<`}</span>
                    <span>{`>`}</span>
                </div>
            </div>);

        return (
            <div>
              <DatePickerHeader/>
              <div className={`${prefix}-calendar-body`}>
                  <div className="calendar-title-container">
 
                  </div>
                  {monthData.map((data, index) => {
                      return null;
                  })}
              </div>
            </div>
        );
    }
}

export default DatePickerPanel;