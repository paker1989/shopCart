import * as React from 'react';
import noop from 'lodash/noop';

import Input from '../input';
import Popover from '../popover';
import { DatePickers } from './common/types';
import DatePickerPanel from './components/DatePickerPanel';

import { getFormattedDate } from './common/util';

import './DatePicker.scss';

class DatePicker extends React.Component<
    DatePickers.IDatePickerProps,
    DatePickers.IDatePickerStates
> {
    static defaultProps = {
        prefix: 'bxu',
        placeholder: '请选择日期',
        isPopover: true,
        format: 'default',
        presentOnly: false,
        displayWeeks: true,
        locale: 'zh',
    };

    constructor(props: DatePickers.IDatePickerProps) {
        super(props);
    }

    render() {
        const {
            isPopover,
            placeholder,
            value,
            prefix,
            format,
            ...otherProps
        } = this.props;

        const selectedDate =
            value === undefined
                ? null
                : value instanceof Date
                ? value
                : new Date(value);

        if (isPopover) {
            const inputValue = getFormattedDate(selectedDate, format);
            return (
                <div className={`${prefix}-datapicker-container`}>
                    <Popover
                        position={Popover.Placement.autoBottomLeft}
                        cushion={2}
                    >
                        <Popover.Trigger.ClickTrigger>
                            <div className="input-wrapper">
                                <Input
                                    placeholder={placeholder}
                                    value={inputValue}
                                    onChange={noop}
                                />
                                <svg
                                    className="ali-icon grey"
                                    aria-hidden="true"
                                >
                                    <use xlinkHref="#icon-calendar"></use>
                                </svg>
                            </div>
                        </Popover.Trigger.ClickTrigger>
                        <Popover.Content>
                            <DatePickerPanel
                                isPopover={true}
                                prefix={prefix}
                                selectedDate={selectedDate}
                                {...otherProps} //包括onChange
                            />
                        </Popover.Content>
                    </Popover>
                </div>
            );
        }

        return (
            <div className={`${prefix}-datapicker-container`}>
                <DatePickerPanel
                    prefix={prefix}
                    selectedDate={selectedDate}
                    {...otherProps}
                />
            </div>
        );
    }
}

export default DatePicker;
