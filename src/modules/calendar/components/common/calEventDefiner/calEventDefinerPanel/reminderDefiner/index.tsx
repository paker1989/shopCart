import * as React from 'react';

import TimeRangeDisplayer from '../timeRangeDisplayer';
import Checkbox from '../../../../../../../_packages_/components/checkbox';
import RepeatPicker from './repeatPicker';

import { CalendarNS } from '../../../../../utils/types';

import './reminderDefiner.scss';

export interface IReminderDefinerProps {
    timeRange: CalendarNS.ITimeRangeFormat;
}

export interface IReminderDefinerStat {
    isDayEvt?: boolean;
}

class ReminderDefiner extends React.Component<
    IReminderDefinerProps,
    IReminderDefinerStat
> {
    static defaultProps = {};

    constructor(props) {
        super(props);
        // const isDayEvt =
        //     (this.props.timeRange as CalendarNS.ITimeRangeFormat).from
        //         .getDate !== undefined; // init dayEvt depends on the timeRange type
        this.state = { isDayEvt: true };
    }

    toggleDayEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isDayEvt: e.target.checked,
        });
    };

    render() {
        const { timeRange } = this.props;
        const { isDayEvt } = this.state;
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
                                isWholeDayEvt={isDayEvt}
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
                                checked={isDayEvt}
                                onChange={this.toggleDayEvent}
                            >
                                全天
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReminderDefiner;
