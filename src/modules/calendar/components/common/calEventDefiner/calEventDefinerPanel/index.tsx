import * as React from 'react';
import cx from 'classnames';
import { IntlShape, FormattedMessage, injectIntl } from 'react-intl';

import CalInput from '../../calInput';
import ReminderDefiner from './reminderDefiner';
import ActivityDefiner from './activityDefiner';

import { CalendarNS } from '../../../../utils/types';

import './calEventDefinePanel.scss';

export interface ICalEventDefinerPanelProps {
    timeRange?: CalendarNS.ITimeRangeFormat;
    initDayEvtValue?: boolean;
    intl: IntlShape;
}

export interface ICalEventDefinerPanelState {
    type?: 'activity' | 'reminder';
    isDayEvt?: boolean;
    // timeRange: CalendarNS.ITimeRangeFormat
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
        // const { timeRange } = this.props;

        this.state = { type: 'activity', isDayEvt: this.props.initDayEvtValue };
    }

    changeType = newType => {
        const { type } = this.state;
        if (type !== newType) {
            // todo
            this.setState({ type: newType });
        }
    };

    handleDayEvtChange = (isDayEvt: boolean): void => {
        this.setState({ isDayEvt });
    };

    render() {
        const { timeRange, intl } = this.props;
        const { type, isDayEvt } = this.state;
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
                        placeholder={intl.formatMessage({ id: 'cal.addTitle' })}
                    />
                </div>
                <div className="calevent-definer-panel__types">
                    <span
                        className={activityWrapperClass}
                        onClick={() => this.changeType('activity')}
                    >
                        <FormattedMessage id="cal.activity" />
                    </span>
                    <span
                        className={reminderWrapperClass}
                        onClick={() => this.changeType('reminder')}
                    >
                        <FormattedMessage id="cal.reminder" />
                    </span>
                </div>
                <div className="calevent-definer-panel__options">
                    {type === 'activity' && (
                        <ActivityDefiner
                            timeRange={timeRange}
                            initDayEvtValue={isDayEvt}
                        />
                    )}
                    {type === 'reminder' && (
                        <ReminderDefiner
                            timeRange={timeRange}
                            initDayEvtValue={isDayEvt}
                            onDayEvtChange={this.handleDayEvtChange}
                        />
                    )}
                </div>
                <div className="calevent-definer-panel__actions">
                    <div className="calevent-definer-panel__actions--main">
                        <button className="btn is-inform">
                            <FormattedMessage id="cal.save" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(CalEventDefinerPanel);
