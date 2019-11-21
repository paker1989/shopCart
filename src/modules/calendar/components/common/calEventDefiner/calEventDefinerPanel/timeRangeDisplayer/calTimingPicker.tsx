import * as React from 'react';
import { useMemo, useState, useRef, useCallback } from 'react';
import cx from 'classnames';
import {
    IntlShape,
    injectIntl,
    FormattedTime,
    FormattedMessage,
} from 'react-intl';

import Popover from '../../../../../../../_packages_/components/popover';
import CalInput from '../../../calInput';
import WindowFrozener from '../../../windowFrozener';
import { CalendarNS } from '../../../../../utils/types';
import { getTimePickerItems } from '../../data.util';
import {
    convertTimeFormatToDate,
    isSameTiming,
    convertDateToITimingFormat,
} from '../../../../../utils/timeRangeHelper';
import { getYYYYMMDDDate } from '../../../../../utils/timeUtils';

export interface ICalTimingPickerProps {
    value?: CalendarNS.ITimingFormat;
    refTiming?: CalendarNS.ITimingFormat;
    pattern?: CalendarNS.TTimingDisplayPattern;
    intl: IntlShape;
    onSelect: (value: Date) => void;
    showOffset?: boolean;
}

const CalTimingPicker = (props: ICalTimingPickerProps) => {
    const { intl, value, refTiming, pattern, onSelect, showOffset } = props;

    const [visible, setVisible] = useState(false);
    const contentRef = useRef(null);

    const onVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    const showValue = intl.formatTime(convertTimeFormatToDate(value), {
        hour12: pattern === '12h',
    });

    const timingOptions: CalendarNS.ITimingOptionProps[] = useMemo(() => {
        return getTimePickerItems(refTiming, intl);
    }, [refTiming.dayAt.getTime()]);

    const getContainer = useCallback(() => {
        return contentRef ? contentRef.current : null;
    }, []);

    const selectTiming = (val: Date): void => {
        onSelect(val);
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
                        {timingOptions.map((item, index) => {
                            let wrapperClass = cx({
                                ['item-wrapper']: true,
                                ['is-selected']: isSameTiming(
                                    convertDateToITimingFormat(item.date),
                                    value
                                ),
                            });
                            return (
                                <div
                                    className={wrapperClass}
                                    key={`timing-picker-option-${index}`}
                                    onClick={() => {
                                        selectTiming(item.date);
                                    }}
                                >
                                    <div className="item-title font-layout-option">
                                        <FormattedTime
                                            value={item.date}
                                            hour12={pattern === '12h'}
                                        />
                                        {showOffset && (
                                            <span className="item-offset">
                                                {item.offset}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
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

CalTimingPicker.defaultProps = {
    showOffset: false,
};

export default injectIntl(CalTimingPicker);
