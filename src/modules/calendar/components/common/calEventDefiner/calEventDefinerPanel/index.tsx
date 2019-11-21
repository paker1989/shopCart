import * as React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { IntlShape, FormattedMessage, injectIntl } from 'react-intl';

import CalInput from '../../calInput';
import ReminderDefiner from './reminderDefiner';
import ActivityDefiner from './activityDefiner';
import {
    getInitActivityModel,
    getInitReminderModel,
    updateDateForDBTiming,
} from '../data.util';
import * as EvtActionCreator from '../../../../store/action/evtsAction';
import * as PopActionCreator from '../../../../store/action/popAction';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import { CalendarNS } from '../../../../utils/types';
import { CalendarRedux } from '../../../../utils/reduxTypes';

import './calEventDefinePanel.scss';
import {
    convertMinAddToDate,
    getAddedMinOfTimeRange,
    convertDateToITimingFormat,
} from '../../../../utils/timeRangeHelper';
import { cps } from 'redux-saga/effects';

export interface ICalEventDefinerPanelProps
    extends CalendarNS.ICalEventDefinerLifeCycleProps {
    timeRange?: CalendarNS.ITimeRangeFormat;
    initDayEvtValue?: boolean;
    intl: IntlShape;
    saveEvt?: (evt: CalEvtDataNS.ICalEvtCompleteDataModelType) => void;
    setEdited?: () => void;
    edited?: boolean;
    updateDefPop?: (defProps: CalendarRedux.IDefinerPopStats) => void;
}

export interface ICalEventDefinerPanelState {
    title: string;
    type?: 'activity' | 'reminder';
    isDayEvt?: boolean;
    activityModel: CalEvtDataNS.ICalEvtActivityOptionDataModel;
    reminderModel: CalEvtDataNS.ICalEvtReminderOptionDataModel;
}

const mapDispatchToProps = dispatch => ({
    saveEvt: (evt: CalEvtDataNS.ICalEvtCompleteDataModelType) =>
        dispatch(EvtActionCreator.saveEvt(evt)),
    updateDefPop: (defProps: CalendarRedux.IDefinerPopStats) =>
        dispatch(PopActionCreator.updateDefinerPop(defProps)),
});

class CalEventDefinerPanel extends React.Component<
    ICalEventDefinerPanelProps,
    ICalEventDefinerPanelState
> {
    static defaultProps = {
        initDayEvtValue: false,
    };

    constructor(props) {
        super(props);
        const { timeRange } = this.props;
        this.state = {
            type: 'activity',
            title: '',
            isDayEvt: this.props.initDayEvtValue,
            activityModel: getInitActivityModel(timeRange),
            reminderModel: getInitReminderModel(timeRange),
        };
    }

    handleFieldChange = (fieldName: string, value: any) => {
        const { activityModel, reminderModel, isDayEvt, type } = this.state;
        const { edited, setEdited, timeRange, updateDefPop } = this.props;
        if (edited === false) {
            setEdited();
        }

        switch (fieldName) {
            case 'title':
                this.setState({ title: value });
                break;
            case 'type':
                this.setState({ type: value });
                break;
            case 'isAllDayEvt':
                this.setState({
                    isDayEvt: value,
                });
                break;
            case 'address':
                this.setState({
                    activityModel: { ...activityModel, address: value },
                });
                break;
            case 'description':
                this.setState({
                    activityModel: { ...activityModel, description: value },
                });
                break;
            case 'repeat':
                this.setState({
                    reminderModel: { ...reminderModel, repeatOption: value },
                });
                break;
            case 'fromDate':
                // console.log(value);
                // console.log(type);
                // console.log(isDayEvt);
                const valueDate = value as Date;
                valueDate.setHours(timeRange.from.hourAt, timeRange.from.minAt);
                let newFrom: CalendarNS.ITimingFormat = {
                    dayAt: valueDate,
                    hourAt: timeRange.from.hourAt,
                    minAt: timeRange.from.minAt,
                };
                let timingDiff = getAddedMinOfTimeRange(timeRange);
                let newToDate: Date = convertMinAddToDate(
                    valueDate,
                    timingDiff
                );
                let newTo: CalendarNS.ITimingFormat = {
                    dayAt: newToDate,
                    hourAt: timeRange.to.hourAt,
                    minAt: timeRange.to.minAt,
                };
                updateDefPop({
                    defTimeRange: {
                        from: { ...newFrom },
                        to: { ...newTo },
                    },
                });
                break;
            case 'toDate':
                const valueDate1 = value as Date;
                valueDate1.setHours(timeRange.to.hourAt, timeRange.to.minAt);
                let newTo1: CalendarNS.ITimingFormat = {
                    dayAt: valueDate1,
                    hourAt: timeRange.to.hourAt,
                    minAt: timeRange.to.minAt,
                };
                let timingDiff1 = getAddedMinOfTimeRange(timeRange);
                let newFromDate1: Date = convertMinAddToDate(
                    valueDate1,
                    -timingDiff1
                );
                let newFrom1: CalendarNS.ITimingFormat = {
                    dayAt: newFromDate1,
                    hourAt: timeRange.from.hourAt,
                    minAt: timeRange.from.minAt,
                };
                updateDefPop({
                    defTimeRange: {
                        from: { ...newFrom1 },
                        to: { ...newTo1 },
                    },
                });
                break;
            case 'fromTiming':
                console.log(value);
                let newFromTiming: CalendarNS.ITimingFormat = convertDateToITimingFormat(
                    value as Date
                );
                let timingDiff2 = getAddedMinOfTimeRange(timeRange);
                let newToTimingDate: Date = convertMinAddToDate(
                    value as Date,
                    timingDiff2
                );
                updateDefPop({
                    defTimeRange: {
                        from: { ...newFromTiming },
                        to: { ...convertDateToITimingFormat(newToTimingDate) },
                    },
                });
                break;
            case 'toTiming':
                console.log(value);
                let newToTiming: CalendarNS.ITimingFormat = convertDateToITimingFormat(
                    value as Date
                );
                updateDefPop({
                    defTimeRange: {
                        from: { ...timeRange.from },
                        to: { ...newToTiming },
                    },
                });
                break;
        }
    };

    handleSave = () => {
        const {
            type,
            title,
            activityModel,
            reminderModel,
            isDayEvt,
        } = this.state;
        const { saveEvt, updateDefPop } = this.props;

        switch (type) {
            case 'activity':
                let activity: CalEvtDataNS.ICalEvtCompleteActivityDataModel = {
                    type,
                    title,
                    allDayEvt: isDayEvt,
                    opts: activityModel,
                };
                saveEvt(activity);
                break;
            case 'reminder':
                let reminder: CalEvtDataNS.ICalEvtCompleteReminderDataModel = {
                    type,
                    title,
                    allDayEvt: isDayEvt,
                    opts: reminderModel,
                };
                saveEvt(reminder);
                break;
        }

        updateDefPop({
            // close popup anyway
            defTimeRange: null,
            globalInitStatus: 'stop',
            defShowPop: false,
            initDayEvtValue: false,
        });
    };

    render() {
        const { timeRange, intl } = this.props;
        const {
            title,
            type,
            isDayEvt,
            activityModel,
            reminderModel,
        } = this.state;
        const activityWrapperClass = cx({
            ['calevent-definer-panel__type']: true,
            [`is-active`]: type === 'activity',
        });
        const reminderWrapperClass = cx({
            ['calevent-definer-panel__type']: true,
            [`is-active`]: type === 'reminder',
        });

        return (
            <div className="calevent-definer-panel">
                <div className="calevent-definer-panel__title">
                    <CalInput
                        value={title}
                        placeholder={intl.formatMessage({ id: 'cal.addTitle' })}
                        onChange={(
                            evt: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            this.handleFieldChange('title', evt.target.value);
                        }}
                    />
                </div>
                <div className="calevent-definer-panel__types">
                    <span
                        className={activityWrapperClass}
                        onClick={() =>
                            this.handleFieldChange('type', 'activity')
                        }
                    >
                        <FormattedMessage id="cal.activity" />
                    </span>
                    <span
                        className={reminderWrapperClass}
                        onClick={() =>
                            this.handleFieldChange('type', 'reminder')
                        }
                    >
                        <FormattedMessage id="cal.reminder" />
                    </span>
                </div>
                <div className="calevent-definer-panel__options">
                    {type === 'activity' && (
                        <ActivityDefiner
                            {...activityModel}
                            onChange={this.handleFieldChange}
                            timeRange={timeRange}
                            initDayEvtValue={isDayEvt}
                        />
                    )}
                    {type === 'reminder' && (
                        <ReminderDefiner
                            {...reminderModel}
                            onChange={this.handleFieldChange}
                            timeRange={timeRange}
                            initDayEvtValue={isDayEvt}
                            // onDayEvtChange={this.handleDayEvtChange}
                        />
                    )}
                </div>
                <div className="calevent-definer-panel__actions">
                    <div className="calevent-definer-panel__actions--main">
                        <button
                            className="btn is-inform"
                            onClick={this.handleSave}
                        >
                            <FormattedMessage id="cal.save" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    () => ({}),
    mapDispatchToProps
)(injectIntl(CalEventDefinerPanel));
