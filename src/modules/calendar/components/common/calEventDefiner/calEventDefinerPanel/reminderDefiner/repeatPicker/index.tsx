import * as React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { DayConverter } from '../../../../../../utils/i18nProvider';
import Popover from '../../../../../../../../_packages_/components/popover';

import './repeatPicker.scss';

export interface IRepeatPickerProps {
    date: Date;
}

class RepeatPicker extends React.PureComponent<IRepeatPickerProps, any> {
    constructor(props) {
        super(props);
        this.state = { isVisible: false };
    }

    onVisibleChange = (isVisible: boolean) => {
        this.setState({ isVisible });
    };

    populateOptions = (date: Date): any[] => {
        const options = [];
        options[0] = {
            title: <FormattedMessage id="cal.everyDay" />,
            code: 'eday',
        };
        options[1] = {
            title: (
                <FormattedMessage
                    id="cal.everySameDay"
                    values={{
                        day: (
                            <FormattedMessage
                                id={DayConverter[date.getDay()]}
                            />
                        ),
                    }}
                />
            ),
            code: 'esdayofweek',
        };
        options[2] = {
            title: <FormattedMessage id="cal.everyWorkDay" />,
            code: 'ewday',
        };
        options[3] = {
            title: (
                <FormattedMessage
                    id="cal.everySameDate"
                    values={{
                        date: (
                            <FormattedDate
                                value={date}
                                month="long"
                                day="2-digit"
                            />
                        ),
                    }}
                />
            ),
            code: 'sdateofyear',
        };
        return options;
    };

    render() {
        const { isVisible } = this.state;
        const { date } = this.props;

        const options = this.populateOptions(date);

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
                            <span>{options[2].title}</span>
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
                                {options.map((option, index) => (
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
