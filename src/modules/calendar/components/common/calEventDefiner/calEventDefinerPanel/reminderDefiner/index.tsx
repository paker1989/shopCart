import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import TimeRangeDisplayer from '../timeRangeDisplayer';
import Checkbox from '../../../../../../../_packages_/components/checkbox';
import RepeatPicker from './repeatPicker';

import { CalendarNS } from '../../../../../utils/types';

import './reminderDefiner.scss';

export interface IReminderDefinerProps {
    timeRange: CalendarNS.ITimeRangeFormat;
    initDayEvtValue?: boolean;
    onDayEvtChange?: (val: boolean) => void;
}

export interface IReminderDefinerStat {
    isWholeDayEvt?: boolean;
}

class ReminderDefiner extends React.Component<
    IReminderDefinerProps,
    IReminderDefinerStat
> {
    static defaultProps = {
        initDayEvtValue: false,
    };

    constructor(props) {
        super(props);
        if (!this.isDayEvtControlled()) {
            this.state = { isWholeDayEvt: this.props.initDayEvtValue };
        }
    }

    isDayEvtControlled = () => {
        return this.props.onDayEvtChange !== undefined;
    };

    getDayRvtValue = () => {
        if (this.isDayEvtControlled()) {
            return this.props.initDayEvtValue;
        } else {
            return this.state.isWholeDayEvt;
        }
    };

    toggleDayEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onDayEvtChange } = this.props;

        if (this.isDayEvtControlled()) {
            onDayEvtChange(e.target.checked);
        } else {
            this.setState({
                isWholeDayEvt: e.target.checked,
            });
        }
    };

    render() {
        const { timeRange } = this.props;
        const isWholeDayEvt = this.getDayRvtValue();
        return (
            <div>
                <div className="calReminder-definer-container">
                    <div className="calReminder-definer-container__option">
                        <span className="calReminder-definer-container__icon">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-time-circle"></use>
                            </svg>
                        </span>
                        <div className="calReminder-definer-container__option--main">
                            <TimeRangeDisplayer
                                time={timeRange}
                                isReminder={true}
                                isWholeDayEvt={isWholeDayEvt}
                            />
                        </div>
                    </div>
                    <div className="calReminder-definer-container__option">
                        <span className="calReminder-definer-container__icon">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-redo"></use>
                            </svg>
                        </span>
                        <div className="calReminder-definer-container__option--main">
                            <div className="calReminder-definer-container__option--repeat">
                                <RepeatPicker />
                            </div>
                            <Checkbox
                                className="calReminder-definer-container__option--check"
                                checked={isWholeDayEvt}
                                onChange={this.toggleDayEvent}
                            >
                                <FormattedMessage id="cal.wholeDay" />
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReminderDefiner;
