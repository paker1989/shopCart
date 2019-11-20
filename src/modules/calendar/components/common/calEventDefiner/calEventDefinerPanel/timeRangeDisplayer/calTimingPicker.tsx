import * as React from 'react';
import { useMemo, useState, useRef, useCallback } from 'react';
import { IntlShape, injectIntl, FormattedTime } from 'react-intl';

import Popover from '../../../../../../../_packages_/components/popover';
import CalInput from '../../../calInput';
import WindowFrozener from '../../../windowFrozener';
import { CalendarNS } from '../../../../../utils/types';
import { getTimePickerItems } from '../../data.util';
import {
    convertTimeFormatToDate,
    convertDateToITimingFormat,
} from '../../../../../utils/timeRangeHelper';

export interface ICalTimingPickerProps {
    timing?: CalendarNS.ITimingFormat;
    pattern?: CalendarNS.TTimingDisplayPattern;
    intl: IntlShape;
    onSelect: (value: CalendarNS.ITimingFormat) => void;
}

const CalTimingPicker = (props: ICalTimingPickerProps) => {
    const { intl, timing, pattern } = props;

    const [visible, setVisible] = useState(false);
    const contentRef = useRef(null);

    const onVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    const showValue = intl.formatTime(convertTimeFormatToDate(timing), {
        hour12: pattern === '12h',
    });

    const timingOptions: CalendarNS.ITimingOptionProps[] = useMemo(() => {
        return getTimePickerItems(timing);
    }, [timing.dayAt.getTime(), timing.hourAt, timing.minAt]);

    const getContainer = useCallback(() => {
        return contentRef ? contentRef.current : null;
    }, []);

    const selectTiming = (val: Date): CalendarNS.ITimingFormat => {
        return convertDateToITimingFormat(val);
    };

    return (
        <Popover
            position={Popover.Placement.autoBottomLeft}
            verCushion={5}
            wrapperClassName="cal-time-container is-timePicker"
            isUnmountOnInvisible={true}
            closeOnClickContent={true}
            isVisible={visible}
            onVisibleChange={onVisibleChange}
        >
            <Popover.Trigger.ClickTrigger>
                <div className="trigger-wrapper">
                    <CalInput
                        placeholder=""
                        value={showValue}
                        className="puretext-input"
                    />
                </div>
            </Popover.Trigger.ClickTrigger>
            <Popover.Content>
                <div className="timingPicker-content-wrapper" ref={contentRef}>
                    <div>
                        {timingOptions.map((item, index) => (
                            <div
                                className="item-wrapper"
                                key={`timing-picker-option-${index}`}
                            >
                                <span
                                    className="item-title font-layout-option"
                                    onClick={() => {
                                        selectTiming(item.date);
                                    }}
                                >
                                    <FormattedTime
                                        value={item.date}
                                        hour12={pattern === '12h'}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                    <WindowFrozener
                        allowScroll={true}
                        getContainer={getContainer}
                    />
                </div>
            </Popover.Content>
        </Popover>
    );
};

// CalTimingPicker.defaultProps = {
//   pattern: '24h'
// }

export default injectIntl(CalTimingPicker);
