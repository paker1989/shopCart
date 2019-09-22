import * as React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { DayConverter } from '../../../../../../utils/i18nProvider';
import Popover from '../../../../../../../../_packages_/components/popover';
import calendarConfig from '../../../../../../assets/scripts/calendar.config';

import './repeatPicker.scss';

export interface IRepeatPickerProps {
    date: Date;
}

class RepeatPicker extends React.PureComponent<IRepeatPickerProps, any> {
    constructor(props) {
        super(props);
        const options = this.populateOptions(this.props.date);
        const selectedIndex = options.findIndex(
            opt => opt.code === calendarConfig.defRepeat
        );
        this.state = {
            isVisible: false,
            selectedIndex,
            options,
        };
    }

    onVisibleChange = (isVisible: boolean) => {
        this.setState({ isVisible });
    };

    populateOptions = (date: Date): any[] => {
        const options = [];

        calendarConfig.repeats.forEach(code => {
            let title;
            if (code === 'everySameDay') {
                title = (
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
                );
            } else if (code === 'everySameDate') {
                title = (
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
                );
            } else {
                title = <FormattedMessage id={`cal.${code}`} />;
            }
            options.push({
                code,
                title,
            });
        });
        return options;
    };

    handleSelectRepeat = selectedIndex => {
        this.setState({ selectedIndex });
    };

    render() {
        const { isVisible, selectedIndex, options } = this.state;

        return (
            <div className="repeatPicker-container">
                <Popover
                    position={Popover.Placement.autoBottomLeft}
                    verCushion={-5}
                    isVisible={isVisible}
                    onVisibleChange={this.onVisibleChange}
                    closeOnClickContent={true}
                >
                    <Popover.Trigger.ClickTrigger>
                        <div
                            role="button"
                            className="btn is-silent repeatPicker-container__trigger"
                        >
                            <span>{options[selectedIndex].title}</span>
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
                                        onClick={() =>
                                            this.handleSelectRepeat(index)
                                        }
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
