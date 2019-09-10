import * as React from 'react';

import Popover from '../../../../../../../../_packages_/components/popover';
// import TimeRangeDisplayer from '../timeRangeDisplayer';
// import CalInput from '../../../../common/calInput';

// import { CalendarNS } from '../../../../../utils/types';
const _test_selected_value = '每个工作日(星期一到星期五)';
const _test_options_props = [
    { title: '每天', code: 'eday' }, // every day
    { title: '每周星期二', code: 'esdayofweek' }, // every same day of week
    { title: '每个工作日(星期一到星期五)', code: 'ewday' }, // every work day
    { title: '每年的9月10日', code: 'sdateofyear' }, // same date of every year
];

import './repeatPicker.scss';

class RepeatPicker extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = { isVisible: false };
    }

    onVisibleChange = (isVisible: boolean) => {
        this.setState({ isVisible });
    };

    render() {
        const { isVisible } = this.state;

        return (
            <div className="repeatPicker-container">
                <Popover
                    position={Popover.Placement.autoBottomLeft}
                    verCushion={-5}
                    isVisible={isVisible}
                    onVisibleChange={this.onVisibleChange}
                >
                    <Popover.Trigger.ClickTrigger>
                        <div
                            role="button"
                            className="btn is-silent repeatPicker-container__trigger"
                        >
                            <span>{_test_selected_value}</span>
                            <svg
                                className="ali-icon is-grey"
                                aria-hidden="true"
                            >
                                <use xlinkHref="#icon-dropdown" />
                            </svg>
                        </div>
                    </Popover.Trigger.ClickTrigger>
                    <Popover.Content>
                        <div className="repeatPicker-container__content">
                            <div className="repeatPicker-container-options">
                                {_test_options_props.map((option, index) => (
                                    <div
                                        className="item-wrapper"
                                        key={`repeat-option-${index}`}
                                    >
                                        <span className="item-title font-layout-option">
                                            {option.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popover.Content>
                </Popover>
            </div>
        );
    }
}

export default RepeatPicker;
