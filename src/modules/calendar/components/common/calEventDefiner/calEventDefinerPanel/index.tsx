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
class CalEventDefinerPanel extends React.Component<
    ICalEventDefinerPanelProps,
    any
> {
    render() {
        return (
            <div className="calevent-definer-panel">
                <div className="calevent-definer-panel__title">
                    <CalInput placeholder="添加标题" />
                </div>
                <div className="calevent-definer-panel__types">
                    <span className="calevent-definer-panel__type is-active">
                        {_test_activity_text}
                    </span>
                    <span className="calevent-definer-panel__type">
                        {_test_reminder_text}
                    </span>
                </div>
                <div className="calevent-definer-panel__options">
                    <ActivityDefiner />
                    {/* <ReminderDefiner /> */}
                </div>
                <div className="calevent-definer-panel__actions">
                  <div className="calevent-definer-panel__actions--main">
                     <button className="btn is-inform">{_test_save_text}</button>
                  </div>
                </div>
            </div>
        );
    }
}

export default CalEventDefinerPanel;
