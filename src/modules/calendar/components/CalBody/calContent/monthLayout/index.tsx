import * as React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { DayConverter } from '../../../../utils/i18nProvider';

import SingleDayGrid from '../common/singleDayGrid';
import WeekLine from './weekLine';
import CalEventDefiner from '../../../common/calEventDefiner';

import {
    isSameDay,
    getMonthLayoutRows,
    isIncludeDate,
    getMaxMinDateFromMonthRow,
} from '../../../../../../_packages_/components/datePicker/common/util';

import {
    getDateRange,
    getCalEventProps,
} from '../../../../utils/timeRangeHelper';
import { CalendarNS } from '../../../../utils/types';

import './monthLayout.scss';

const _test_display_we_flag = true;
const i18nHeaders = [
    { dayIndex: 0, label: <FormattedMessage id={DayConverter[0]} /> },
    { dayIndex: 1, label: <FormattedMessage id={DayConverter[1]} /> },
    { dayIndex: 2, label: <FormattedMessage id={DayConverter[2]} /> },
    { dayIndex: 3, label: <FormattedMessage id={DayConverter[3]} /> },
    { dayIndex: 4, label: <FormattedMessage id={DayConverter[4]} /> },
    { dayIndex: 5, label: <FormattedMessage id={DayConverter[5]} /> },
    { dayIndex: 6, label: <FormattedMessage id={DayConverter[6]} /> },
];

const mapStateToProps = state => ({
    locale: state.layoutReducers.locale,
    currentDate: state.dateReducers.currentDate,
    currentYear: state.dateReducers.currentYear,
    currentMonth: state.dateReducers.currentMonth,
    definerCalEvtSignal: state.dateReducers.definerCalEvtSignal,
});

export interface IMonthLayoutState {
    dragStatus: CalendarNS.TCalEventPopDragStatusType;
    triggerTiming: Date;
    draggingDateRange: CalendarNS.ITimeRangeFormat;
    definePopId?: string;
}

class MonthLayout extends React.Component<any, IMonthLayoutState> {
    private startRef?: React.RefObject<HTMLDivElement>;
    private endRef?: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.state = {
            dragStatus: 'none',
            triggerTiming: null,
            draggingDateRange: null,
            definePopId: null,
        };
    }

    setDateRangeRef = (
        ref: React.RefObject<HTMLDivElement>,
        type: 'start' | 'end'
    ): void => {
        switch (type) {
            case 'start':
                this.startRef = ref;
                return;
            case 'end':
                this.endRef = ref;
                return;
        }
    };

    componentDidUpdate(prevProps) {
        const { definerCalEvtSignal, currentYear, currentMonth } = this.props;
        const { definePopId } = this.state;
        if (
            prevProps.definerCalEvtSignal === true &&
            definerCalEvtSignal === false
        ) {
            CalEventDefiner.destroyDefiner(definePopId);
        }
        if (
            prevProps.definerCalEvtSignal === false &&
            definerCalEvtSignal === true
        ) {
            const monthDataRow = getMonthLayoutRows(
                currentYear,
                currentMonth + 1,
                _test_display_we_flag
            );
            const dates = getMaxMinDateFromMonthRow(monthDataRow);
            const dateToUse = isIncludeDate(dates, new Date())
                ? new Date()
                : dates[0];
            this.handleOnMouseClick(getDateRange(dateToUse, dateToUse));
        }
    }

    handleOnMouseClick = (timeRange: CalendarNS.ITimeRangeFormat) => {
        const { dragStatus, definePopId } = this.state;
        const { locale } = this.props;

        if (dragStatus === 'holdon') {
            CalEventDefiner.destroyDefiner(definePopId); // destroy holdon pop if exist
        }

        this.setState(
            {
                dragStatus: 'dragging',
                triggerTiming: timeRange.from.dayAt,
                draggingDateRange: timeRange,
            },
            () => {
                let newDefinePopId = CalEventDefiner.initEventDefiner(locale, {
                    timeRange,
                    positionner: CalEventDefiner.Position.autoAside,
                    simuDragPopNode: this.getSimuDragPopNode(),
                    bottomCurshion: 50,
                    topCurshion: 30,
                    asideCurshion: 10,
                    initDayEvtValue: true,
                });
                this.setState({
                    dragStatus: 'holdon',
                    definePopId: newDefinePopId,
                });
            }
        );
    };

    handleMouseEvent = (
        selectedDate: Date,
        eventType: CalendarNS.TDefineEventType
    ): void => {
        const { dragStatus, triggerTiming, definePopId } = this.state;
        switch (eventType) {
            case 'click':
                console.log('click');
                break;
            case 'mousedown':
                if (dragStatus === 'holdon') {
                    CalEventDefiner.destroyDefiner(definePopId); // destroy holdon pop if exist
                }
                this.setState(
                    {
                        dragStatus: 'dragging',
                        triggerTiming: selectedDate,
                        draggingDateRange: getDateRange(
                            selectedDate,
                            selectedDate
                        ),
                    },
                    () => {
                        window.addEventListener('mouseup', this.holdonDragging);
                    }
                );
                break;
            case 'mouseup':
                if (dragStatus === 'dragging') {
                    this.holdonDragging();
                }
                break;
            case 'mouseenter':
                if (dragStatus !== 'dragging') {
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

    holdonDragging = () => {
        const { dragStatus, draggingDateRange } = this.state;
        const { locale } = this.props;

        if (dragStatus === 'dragging') {
            let definePopId = CalEventDefiner.initEventDefiner(locale, {
                timeRange: draggingDateRange,
                positionner: CalEventDefiner.Position.autoAside,
                simuDragPopNode: this.getSimuDragPopNode(),
                bottomCurshion: 50,
                topCurshion: 30,
                asideCurshion: 10,
                initDayEvtValue: true,
            });
            this.setState({ dragStatus: 'holdon', definePopId }, () => {
                window.removeEventListener('mouseup', this.holdonDragging);
            });
        }
    };

    getSimuDragPopNode = (): CalendarNS.ISimuBoundingClientRect => {
        if (!this.startRef || !this.endRef) {
            return {};
        }
        const startNodeBdBox = this.startRef.current.getBoundingClientRect();
        const endNodeBdBox = this.endRef.current.getBoundingClientRect();
        return {
            top: startNodeBdBox.top,
            bottom: endNodeBdBox.bottom,
            left: startNodeBdBox.left,
            right: endNodeBdBox.right,
        };
    };

    render() {
        const { currentYear, currentMonth, currentDate } = this.props;
        const { dragStatus, draggingDateRange } = this.state;

        const headers = _test_display_we_flag
            ? i18nHeaders
            : i18nHeaders.filter(
                  day => day.dayIndex !== 0 && day.dayIndex !== 6
              );
        const monthDataRow = getMonthLayoutRows(
            currentYear,
            currentMonth + 1,
            _test_display_we_flag
        );
        const wrapperClass = cx({
            ['calbody-content-monthLayout-container']: true,
            ['is-ondragging']: dragStatus === 'dragging',
        });

        return (
            <div className={wrapperClass}>
                <div className="calbody-content-monthLayout-container__slide">
                    <WeekLine weeks={monthDataRow.weeks} />
                </div>
                <div className="calbody-content-monthLayout-container__main">
                    <div className="calbody-content-monthLayout-container__header">
                        {headers.map((header, index) => (
                            <div
                                className="calbody-content-monthLayout-container__header--item"
                                style={{
                                    width: `${100 / headers.length}%`,
                                }}
                                key={`monthLayout-header-item-${index}`}
                            >
                                {header.label}
                            </div>
                        ))}
                    </div>
                    <div className="calbody-content-monthLayout-container__rows">
                        {monthDataRow.rows.map((row, index) => (
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
                                        day.yearD !== currentYear ||
                                        day.monthD !== currentMonth;
                                    const isSelected: boolean = isSameDay(
                                        day,
                                        currentDate
                                    );
                                    const gridDate: Date = new Date(
                                        day.yearD,
                                        day.monthD - 1,
                                        day.showDate
                                    );
                                    const calEventProps: CalendarNS.IMonthCalEventProps =
                                        dragStatus === 'none'
                                            ? { isInvolved: false }
                                            : getCalEventProps(
                                                  draggingDateRange,
                                                  index,
                                                  gridDate
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
                                                setDateRangeRef={
                                                    this.setDateRangeRef
                                                }
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

export default connect(mapStateToProps)(injectIntl(withRouter(MonthLayout)));
