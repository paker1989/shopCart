import * as React from 'react';

import SingleDayGrid from '../common/singleDayGrid';
import WeekLine from './weekLine';

import { isSameDay } from '../../../../../../_packages_/components/datePicker/common/util';
import { getMonthLayoutRows } from '../../../../utils/timeUtils';
import { CalendarNS } from '../../../../utils/types';

import './monthLayout.scss';

const _test_display_we_flag = true;
const _display_year = 2019;
const _display_month = 6;
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
    render() {
        const headers = _test_display_we_flag
            ? _test_headers
            : _test_headers.filter(
                  day => day.dayIndex !== 0 && day.dayIndex !== 6
              );

        return (
            <div className="calbody-content-monthLayout-container">
                <div className="calbody-content-monthLayout-container__slide">
                    <WeekLine weeks={weeks}/>
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
