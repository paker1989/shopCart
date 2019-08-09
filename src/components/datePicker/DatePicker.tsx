import * as React from 'react';
import noop from 'lodash/noop';

import Input from '../input';
import Popover from '../popover';
import { DatePickers } from './common/types';
import DatePickerPanel from './components/DatePickerPanel';


import './DatePicker.scss';

class DatePicker extends React.PureComponent
    <DatePickers.IDatePickerProps, DatePickers.IDatePickerStates> {

    static defaultProps = {
        prefix: 'bxu',
        placeholder: '请选择日期',
        isPopover: true
    }

    constructor(props: DatePickers.IDatePickerProps) {
        super(props);
        // this.state = { currentDate: new Date() };
    }

    componentDidMount() {

    }

    render() {
        const { isPopover, placeholder, prefix, value } = this.props;

        const selectedDate = (value === undefined) ? null: new Date(value);

        if (isPopover) {
            return (
                <div className={`${prefix}-datapicker-container`}>
                    <Popover position={Popover.Placement.autoBottomLeft}
                        cushion={2}>
                        <Popover.Trigger.ClickTrigger>
                            <Input placeholder={placeholder}
                            value={value || ''}
                            width={160} 
                            onChange={noop}/>
                        </Popover.Trigger.ClickTrigger>
                        <Popover.Content>
                            <DatePickerPanel isPopover={true} prefix={prefix} />
                        </Popover.Content>
                    </Popover>
                </div>

            );
        }

        return (
            <div className={`${prefix}-datapicker-container`}>
                <DatePickerPanel prefix={prefix} selectedDate={selectedDate} />
            </div>
        );

    }
}

export default DatePicker;