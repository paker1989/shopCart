import * as React from 'react';

import CalEventPresenter from '../../../common/calEventPresenter';
import DayEvtPresenter from '../../../common/dayEvtPresenter';

import { DatePicker } from '../../../../../../_packages_/components/datePicker';
import { DatePickers } from '../../../../../../_packages_/components/datePicker/common/types';
import { getMonthDataOfYear } from '../../../../utils/timeUtils';
import { CalendarNS } from '../../../../utils/types';

import './yearLayout.scss';
import calEventPresenter from '../../../common/calEventPresenter';

export interface IYearLayoutProps {
    displayYear?: number;
}

export interface IYearLayoutStats {
    months?: DatePickers.IMonthDataRowFormat[];
}

const CustomizeHeader: React.FunctionComponent = props => {
    const { children } = props;
    return (
        <div className="calbody-content-yearLayout-container__monthHeader is-lighter-gey">
            {children}
        </div>
    );
};

class YearLayout extends React.Component<IYearLayoutProps, IYearLayoutStats> {
    constructor(props) {
        super(props);
        this.state = {
            months: getMonthDataOfYear(this.props.displayYear),
        };
    }

    static defaultProps = {
        displayYear: new Date().getFullYear(),
    };

    handleDateClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        calEventPresenter.initPresenter(DayEvtPresenter, {
            dragPopNode: evt.target as Element,
            asideCurshion: 5,
            bottomCurshion: 10,
            topCurshion: 10,
        });
    };

    handleDateDoubleClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        // todo
        console.log('on db click');
        console.log(evt);
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
                                onClick={this.handleDateClick}
                                onDbClick={this.handleDateDoubleClick}
                                displayWeeks={true}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default YearLayout;
