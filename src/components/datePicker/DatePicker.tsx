import * as React from 'react';
import Popover from '../popover';
import DatePickers from './common/types';
import DatePickerPanel from './components/DatePickerPanel';

class DatePicker extends React.PureComponent
    <DatePickers.IDatePickerProps, DatePickers.IDatePickerStates> {

    static defaultProps = {
        prefix: 'bxu',
        placeholder: '请选择日期',
        isPopup: true
    }

    constructor(props) {
        super(props);
        this.state = { currentDate: new Date() };
    }

    componentDidMount() {

    }

    render() {
        const { isPopup } = this.props;

        const { currentDate } = this.state;

        if (isPopup) {
            return (
                <Popover position={Popover.Placement.autoBottomLeft}
                    cushion={2}>
                    <Popover.Trigger.ClickTrigger>
                        sd
                    </Popover.Trigger.ClickTrigger>
                    <Popover.Content>
                        <DatePickerPanel currentDate={currentDate} />
                    </Popover.Content>
                </Popover>
            );
        }

        return (
            <div>
                <DatePickerPanel currentDate={currentDate} />
            </div>
        );

    }
}

export default DatePicker;