import * as React from 'react';

import TimeRangeDisplayer from '../timeRangeDisplayer';
import CalInput from '../../../calInput';
import GooglePlaceAPIManager from '../../../googlePlaceAPIManager';

import { CalendarNS } from '../../../../../utils/types';
import './activityDefiner.scss';

const _test_add_location_placeholder = '添加一个有意思的地点';
const _test_add_comment_placeholder = '添加一个暖心的说明';

export interface IActivityDefinerProps {
    timeRange: CalendarNS.ITimeRangeFormat;
    initDayEvtValue?: boolean;
}

class ActivityDefiner extends React.Component<IActivityDefinerProps, any> {
    static defaultProps = {
        initDayEvtValue: false,
    };
    render() {
        const { timeRange, initDayEvtValue } = this.props;
        return (
            <div className="calActivity-definer-container">
                <GooglePlaceAPIManager />
                <div className="calActivity-definer-container__option">
                    <span className="calActivity-definer-container__icon">
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-time-circle"></use>
                        </svg>
                    </span>
                    <div className="calActivity-definer-container__option--main">
                        <TimeRangeDisplayer
                            time={timeRange}
                            isWholeDayEvt={initDayEvtValue}
                        />
                    </div>
                </div>
                <div className="calActivity-definer-container__option">
                    <span className="calActivity-definer-container__icon">
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                        </svg>
                    </span>
                    <span className="calActivity-definer-container__option--main">
                        <CalInput
                            className="calActivity-definer-container__input"
                            placeholder={_test_add_location_placeholder}
                        />
                    </span>
                </div>
                <div className="calActivity-definer-container__option--comment">
                    <div className="calActivity-definer-container__option">
                        <span className="calActivity-definer-container__icon">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-unorderedlist"></use>
                            </svg>
                        </span>
                        <span className="calActivity-definer-container__option--main">
                            <CalInput
                                className="calActivity-definer-container__input"
                                placeholder={_test_add_comment_placeholder}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivityDefiner;
