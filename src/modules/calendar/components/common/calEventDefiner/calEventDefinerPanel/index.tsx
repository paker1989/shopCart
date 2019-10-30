import * as React from 'react';
import cx from 'classnames';
import { IntlShape, FormattedMessage, injectIntl } from 'react-intl';

import CalInput from '../../calInput';
import ReminderDefiner from './reminderDefiner';
import ActivityDefiner from './activityDefiner';
import { getInitActivityModel, getInitReminderModel } from '../data.util';
import { CalEvtDataNS } from '../../../../utils/evtTypes';
import { CalendarNS } from '../../../../utils/types';

import './calEventDefinePanel.scss';

export interface ICalEventDefinerPanelProps
    extends CalendarNS.ICalEventDefinerLifeCycleProps {
    timeRange?: CalendarNS.ITimeRangeFormat;
    initDayEvtValue?: boolean;
    intl: IntlShape;
}

export interface ICalEventDefinerPanelState {
    title: string;
    type?: 'activity' | 'reminder';
    isDayEvt?: boolean;
    activityModel: CalEvtDataNS.ICalEvtActivityOptionDataModel;
    reminderModel: CalEvtDataNS.ICalEvtReminderOptionDataModel;
}

class CalEventDefinerPanel extends React.Component<
    ICalEventDefinerPanelProps,
    ICalEventDefinerPanelState
> {
    static defaultProps = {
        initDayEvtValue: false,
    };

    constructor(props) {
        super(props);
        const { initDayEvtValue, timeRange } = this.props;
        this.state = {
            type: 'activity',
            title: '',
            isDayEvt: this.props.initDayEvtValue,
            activityModel: getInitActivityModel(initDayEvtValue, timeRange),
            reminderModel: getInitReminderModel(timeRange),
        };
    }

    // changeType = newType => {
    //     const { type } = this.state;
    //     if (type !== newType) {
    //         this.setState({ type: newType });
    //     }
    // };

    // handleDayEvtChange = (isDayEvt: boolean): void => {
    //     this.setState({ isDayEvt });
    // };

    handleFieldChange = (fieldName: string, value: any) => {
        const { activityModel, reminderModel } = this.state;
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
        }
    };

    handleSave = () => {
        
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

export default injectIntl(CalEventDefinerPanel);
