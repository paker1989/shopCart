import * as React from 'react';
import cx from 'classnames';
import DatePickers from './common/types';
import { getMonthData } from './common/util';

/**
 * 方便到时候扩展别的date picker
 */
export interface IDatePickerProps extends DatePickers.ICommonProps {
}

export interface IDatePickerStates extends DatePickers.ICommonState {

}

// export interface displayData {

// }

class DatePicker extends React.PureComponent<IDatePickerProps, IDatePickerStates> {

    static defaultProps = {
      prefix: 'bxu',
      placeholder: '请选择日期',
      isPopup: true
    }

    static populateDisplay(date: Date): DatePickers.ICommonState {
        const displayYear: number = date.getFullYear();
        const displayMonth: number = date.getMonth();
        const monthData: DatePickers.IMonthDataFormat[] = getMonthData(displayYear, displayMonth);

        return { displayYear, displayMonth, monthData };
    }

    constructor(props: IDatePickerProps) {
        super(props);
        const { displayYear, displayMonth, monthData } = DatePicker.populateDisplay(new Date());
        this.state = { displayYear, displayMonth, monthData };
    }

    componentDidMount() {

    }

    render() {
        const {
          prefix,
        } = this.props;

        const {
          displayYear,
          displayMonth,
          monthData
        } = this.state;

        let DatePickerHeader = (
          <div className={`${prefix}-datepicker-header`}>
             <div className={`${prefix}-header-title`}>
                 {`${displayYear}年${displayMonth}月`}
             </div>
             <div className={`${prefix}-header-action`}>
                <span>{`<`}</span>
                <span>{`>`}</span>
             </div>
          </div>
        );
        return (
            <div>
               {DatePickerHeader}
            </div>
        );
    }
}

export default DatePicker;