import * as React from 'react';
import { IntlShape, injectIntl } from 'react-intl';

import AddressPicker from './addressPicker';
import TimeRangeDisplayer from '../timeRangeDisplayer';
import CalInput from '../../../calInput';
import GooglePlaceAPIManager from '../../../googlePlaceAPIManager';

import { CalendarNS } from '../../../../../utils/types';
import './activityDefiner.scss';

export interface IActivityDefinerProps {
    timeRange: CalendarNS.ITimeRangeFormat;
    initDayEvtValue?: boolean;
    intl: IntlShape;
    description?: string;
    address?: string;
    color?: string;
    onChange?: (field: string, value: any) => void;
}

class ActivityDefiner extends React.Component<IActivityDefinerProps, any> {
    static defaultProps = {
        initDayEvtValue: false,
    };
    render() {
        const {
            timeRange,
            initDayEvtValue,
            intl,
            address,
            onChange,
            description,
        } = this.props;
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
                        <AddressPicker value={address} onChange={onChange} />
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
                                onChange={e => {
                                    onChange('description', e.target.value);
                                }}
                                value={description}
                                className="calActivity-definer-container__input"
                                placeholder={intl.formatMessage({
                                    id: 'cal.addDescription',
                                })}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(ActivityDefiner);
