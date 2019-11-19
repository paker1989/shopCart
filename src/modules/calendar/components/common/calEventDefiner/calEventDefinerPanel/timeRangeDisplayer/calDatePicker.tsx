import * as React from 'react';
import { useState, useCallback } from 'react';
import { DatePicker } from '../../../../../../../_packages_/components/datePicker';
import Popover from '../../../../../../../_packages_/components/popover';
import CalInput from '../../../calInput';
import WindowFrozener from '../../../windowFrozener';
import { CalendarNS } from '../../../../../utils/types';
import { DatePickers } from '../../../../../../../_packages_/components/datePicker/common/types';
import { getDateToNav } from '../../../../../utils/routeHelper';

export interface ICalDatePickerProps {
    value: Date;
    showValue: string;
    onSelect?: (value: Date) => void;
}

const CalDatePicker = (props: ICalDatePickerProps) => {
    const { value, showValue, onSelect } = props;
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);

    const onVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    const toSiblingMonth = (actiontype: DatePickers.EMonthChangeType) => {
        let newDate: Date;
        switch (actiontype) {
            case DatePickers.EMonthChangeType._prev_:
                newDate = getDateToNav(selectedDate, 'month', 'prev');
                break;
            case DatePickers.EMonthChangeType._next_:
                newDate = getDateToNav(selectedDate, 'month', 'next');
                break;
        }
        setSelectedDate(newDate);
    };

    return (
        <Popover
            wrapperClassName="cal-time-container is-datePicker"
            position={Popover.Placement.autoBottomLeft}
            verCushion={5}
            isVisible={visible}
            onVisibleChange={onVisibleChange}
            isUnmountOnInvisible={true}
        >
            <Popover.Trigger.ClickTrigger>
                <div className="trigger-wrapper">
                    <CalInput
                        value={showValue}
                        placeholder=""
                        className="puretext-input"
                    />
                </div>
            </Popover.Trigger.ClickTrigger>
            <Popover.Content>
                <div className="datepicker-content-wrapper">
                    <DatePicker
                        value={selectedDate}
                        isPopover={false}
                        onClick={onSelect}
                        format="YYYY/MM/DD"
                        toSiblingMonth={toSiblingMonth}
                    />
                    <WindowFrozener />
                </div>
            </Popover.Content>
        </Popover>
    );
};

export default CalDatePicker;
