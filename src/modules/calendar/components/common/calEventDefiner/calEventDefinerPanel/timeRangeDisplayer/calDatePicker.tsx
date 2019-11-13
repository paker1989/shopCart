import * as React from 'react';
import { useState } from 'react';
import { DatePicker } from '../../../../../../../_packages_/components/datePicker';
import Popover from '../../../../../../../_packages_/components/popover';
import CalInput from '../../../calInput';
import WindowFrozener from '../../../windowFrozener';


export interface ICalDatePickerProps {
    value: Date;
    showValue: string;
    onSelect?: (value: Date) => void;
}

const CalDatePicker = (props: ICalDatePickerProps) => {
    const { value, showValue } = props;
    const [visible, setVisible] = useState(false);

    const onVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    return (
        <Popover
            wrapperClassName="cal-datepicker-container"
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
                        value={value}
                        isPopover={false}
                        onClick={() => {}}
                        format="YYYY/MM/DD"
                        toSiblingMonth={() => {}}
                    />
                    <WindowFrozener />
                </div>
            </Popover.Content>
        </Popover>
    );
};

export default CalDatePicker;
