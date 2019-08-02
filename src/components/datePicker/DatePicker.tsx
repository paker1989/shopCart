import * as React from 'react';
import cx from 'classnames';
import DatePickers from './common/types';
import { getMonthData } from './common/util';

export interface IDatePickerProps extends DatePickers.ICommonProps {
}

// export interface displayData {

// }

class DatePicker extends React.PureComponent<IDatePickerProps, DatePickers.ICommonState> {

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
        return (
            <div>

            </div>
        );
    }
}

export default DatePicker;