import * as React from 'react';

import { DatePicker } from '../../../../../../_packages_/components/datePicker';
import { getMonthDataOfYear } from '../../../../utils/timeUtils';
import { CalendarNS } from '../../../../utils/types';

import './yearLayout.scss';

export interface IYearLayoutProps {
    displayYear?: number;
}

const CustomizeHeader: React.FunctionComponent = props => {
    const { children } = props;
    return (
        <div className="calbody-content-yearLayout-container__monthHeader is-lighter-gey">
            {children}
        </div>
    );
};

class YearLayout extends React.Component<IYearLayoutProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            months: getMonthDataOfYear(this.props.displayYear),
        };
    }

    static defaultProps = {
        displayYear: new Date().getFullYear(),
    };

    handleDateSelect = (selectedDate: Date): void => {
        // todo
    };

    render() {
        const { displayYear } = this.props;
        const { months } = this.state;

        return (
            <div className="calbody-content-yearLayout-container">
                <div className="calbody-content-yearLayout-container__months">
                    {months.map((monthData, index) => {
                        const header = (
                            <CustomizeHeader>
                                {`${index + 1}月`}
                            </CustomizeHeader>
                        );
                        return (
                            <DatePicker
                                isPopover={false}
                                format="YYYY/MM/DD"
                                key={`yearLayout-month-${index}`}
                                presentOnly={true}
                                customizedHeader={header}
                                displayYear={displayYear}
                                displayMonth={index + 1}
                                monthData={monthData}
                                onSelect={this.handleDateSelect}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default YearLayout;
