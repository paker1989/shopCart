import * as React from 'react';

import SingleDayGrid from '../common/singleDayGrid';
import WeekLine from './weekLine';

import { isSameDay } from '../../../../../../_packages_/components/datePicker/common/util';
import { getMonthLayoutRows } from '../../../../utils/timeUtils';
import {
    getDateRange,
    getCalEventProps,
} from '../../../../utils/timeRangeHelper';
import { CalendarNS } from '../../../../utils/types';

import './monthLayout.scss';

const _test_display_we_flag = true;
const _display_year = 2019;
const _display_month = 9;
const _test_month_data_rows = getMonthLayoutRows(
    _display_year,
    _display_month,
    _test_display_we_flag
);
const weeks = _test_month_data_rows.weeks;

const _select_date = new Date(2019, 7, 14);

const _test_headers = [
    { dayIndex: 0, label: '周日' },
    { dayIndex: 1, label: '周一' },
    { dayIndex: 2, label: '周二' },
    { dayIndex: 3, label: '周三' },
    { dayIndex: 4, label: '周四' },
    { dayIndex: 5, label: '周五' },
    { dayIndex: 6, label: '周六' },
];

class MonthLayout extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isOnDragging: false,
            triggerTiming: null,
            draggingDateRange: null,
        };
    }

    handleMouseEvent = (
        selectedDate: Date,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { isOnDragging, triggerTiming } = this.state;

        console.log('selected date = ' + selectedDate);
        switch (eventType) {
            case 'click':
                console.log('click');
                break;
            case 'mousedown':
                this.setState(
                    {
                        isOnDragging: true,
                        triggerTiming: selectedDate,
                        draggingDateRange: getDateRange(
                            selectedDate,
                            selectedDate
                        ),
                    },
                    () => {
                        // window.addEventListener('mouseup', this.stopDragging);
                    }
                );
                break;
            case 'mouseup':
                if (isOnDragging) {
                    // this.stopDragging();
                }
                break;
            case 'mouseenter':
                if (!isOnDragging) {
                    return;
                } else {
                    this.setState({
                        draggingDateRange: getDateRange(
                            triggerTiming,
                            selectedDate
                        ),
                    });
                }
                break;
        }
    };

    stopDragging = () => {
        const { isOnDragging } = this.state;

        if (isOnDragging) {
            this.setState(
                {
                    isOnDragging: false,
                    triggerTiming: null,
                    draggingDateRange: null,
                },
                () => {
                    window.removeEventListener('mouseup', this.stopDragging);
                }
            );
        }
    };

    render() {
        const headers = _test_display_we_flag
            ? _test_headers
            : _test_headers.filter(
                  day => day.dayIndex !== 0 && day.dayIndex !== 6
              );
        const { isOnDragging, draggingDateRange } = this.state;

        return (
            <div className="calbody-content-monthLayout-container">
                <div className="calbody-content-monthLayout-container__slide">
                    <WeekLine weeks={weeks} />
                </div>
                <div className="calbody-content-monthLayout-container__main">
                    <div className="calbody-content-monthLayout-container__header">
                        {headers.map((header, index) => (
                            <div
                                className="calbody-content-monthLayout-container__header--item"
                                key={`monthLayout-header-item-${index}`}
                            >
                                {header.label}
                            </div>
                        ))}
                    </div>
                    <div className="calbody-content-monthLayout-container__rows">
                        {_test_month_data_rows.rows.map((row, index) => (
                            <div
                                key={`monthLayout-rows-item-${index}`}
                                className="calbody-content-monthLayout-container__row"
                            >
                                {row.map((day, index) => {
                                    const isToday: boolean = isSameDay(
                                        day,
                                        new Date()
                                    );
                                    const isGrey: boolean =
                                        day.yearD !== _display_year ||
                                        day.monthD !== _display_month;
                                    const isSelected: boolean = isSameDay(
                                        day,
                                        _select_date
                                    );
                                    const gridDate: Date = new Date(
                                        day.yearD,
                                        day.monthD - 1,
                                        day.showDate
                                    );
                                    const calEventProps: CalendarNS.IMonthCalEventProps = isOnDragging
                                        ? getCalEventProps(
                                              draggingDateRange,
                                              index,
                                              gridDate
                                          )
                                        : { isInvolved: false };

                                    return (
                                        <div
                                            key={`monthLayout-row-item-${index}`}
                                            style={{
                                                width: `${100 / row.length}%`,
                                            }}
                                            className="calbody-content-monthLayout-container__row--item"
                                        >
                                            <SingleDayGrid
                                                showValue={day.showDate}
                                                value={gridDate}
                                                isToday={isToday}
                                                isGrey={isGrey}
                                                isSelected={isSelected}
                                                onMouseEventChange={
                                                    this.handleMouseEvent
                                                }
                                                {...calEventProps}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default MonthLayout;
