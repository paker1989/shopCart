import * as React from 'react';

import Popover from '../../../../../../../_packages_/components/popover';
import CalInput from '../../../../common/calInput';
import WindowFrozener from '../../../windowFrozener';
import { CalendarNS } from '../../../../../utils/types';

export interface ICalTimerangePickerProps {
    timing: CalendarNS.ITimingFormat;
    pattern: CalendarNS.TTimingDisplayPattern;
}

const CalTimerangePicker = (props: ICalTimerangePickerProps) => {
    return (
        <Popover
            position={Popover.Placement.autoBottomLeft}
            verCushion={5}
            wrapperClassName=""
            isUnmountOnInvisible={true}
        >
            <Popover.Trigger.HoverTrigger>
                <div className="trigger-wrapper">
                    <CalInput placeholder="" />
                </div>
            </Popover.Trigger.HoverTrigger>
            <Popover.Content>
                <div className="content-wrapper">
                    <div className="timeRange-picker"></div>
                    <WindowFrozener />
                </div>
            </Popover.Content>
        </Popover>
    );
};

CalTimerangePicker.defaultProps = {
  pattern: '24h'
}

export default CalTimerangePicker;
