import * as React from 'react';
import cx from 'classnames';

import CalInput from '../../calInput';
import ReminderDefiner from './reminderDefiner';
import ActivityDefiner from './activityDefiner';

import { CalendarNS } from '../../../../utils/types';

import './calEventDefinePanel.scss';

const _test_activity_text = '活动';
const _test_reminder_text = '提醒';
const _test_save_text = '保存';

export interface ICalEventDefinerPanelProps {
    timeRange?: CalendarNS.ITimeRangeFormat;
}

export interface ICalEventDefinerPanelState {
    type?: 'activity' | 'reminder';
}

class CalEventDefinerPanel extends React.Component<
    ICalEventDefinerPanelProps,
    ICalEventDefinerPanelState
> {
    constructor(props) {
        super(props);
        this.state = { type: 'activity' };
    }

    changeType = newType => {
        const { type } = this.state;
        if (type !== newType) {
            // todo
            this.setState({ type: newType });
        }
    };

    render() {
        const { timeRange } = this.props;
        const { type } = this.state;
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
                    <CalInput placeholder="添加标题" />
                </div>
                <div className="calevent-definer-panel__types">
                    <span
                        className={activityWrapperClass}
                        onClick={() => this.changeType('activity')}
                    >
                        {_test_activity_text}
                    </span>
                    <span
                        className={reminderWrapperClass}
                        onClick={() => this.changeType('reminder')}
                    >
                        {_test_reminder_text}
                    </span>
                </div>
                <div className="calevent-definer-panel__options">
                    {type === 'activity' && (
                        <ActivityDefiner timeRange={timeRange} />
                    )}
                    {type === 'reminder' && (
                        <ReminderDefiner timeRange={timeRange} />
                    )}
                </div>
                <div className="calevent-definer-panel__actions">
                    <div className="calevent-definer-panel__actions--main">
                        <button className="btn is-inform">
                            {_test_save_text}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalEventDefinerPanel;
