import * as React from 'react';
import { connect } from 'react-redux';

import DayEvtPresenter from '../../../common/dayEvtPresenter';

import { DatePicker } from '../../../../../../_packages_/components/datePicker';
import { getMonthDataOfYear } from '../../../../utils/timeUtils';
import { isSameDay } from '../../../../../../_packages_/components/datePicker/common/util';

import calEventPresenter from '../../../common/calEventPresenter';
import { CalendarNS } from '../../../../utils/types';

import './yearLayout.scss';

export interface IYearLayoutProps {
    displayYear?: number;
    locale?: CalendarNS.TLocales;
}

const CustomizeHeader: React.FunctionComponent = props => {
    const { children } = props;
    return (
        <div className="calbody-content-yearLayout-container__monthHeader is-lighter-gey">
            {children}
        </div>
    );
};

const mapStateToProps = state => ({
    locale: state.layoutReducers.locale,
    displayYear: state.dateReducers.currentYear,
});

class YearLayout extends React.Component<IYearLayoutProps, any> {
    private currentPopId: string;
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        calEventPresenter.destroyPresenter(this.currentPopId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.displayYear !== this.props.displayYear) {
            calEventPresenter.destroyPresenter(this.currentPopId);
        }
    }

    handleDateClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        const { locale } = this.props;
        if (
            this.currentPopId &&
            calEventPresenter.getPopReference(this.currentPopId)
        ) {
            const { date } = calEventPresenter.getPopReference(
                this.currentPopId
            );
            if (isSameDay(date, selectedDate)) {
                console.log('same day,return');
                return;
            } else {
                calEventPresenter.destroyPresenter(this.currentPopId);
            }
        }

        this.currentPopId = calEventPresenter.initPresenter(
            locale,
            DayEvtPresenter,
            {
                dragPopNode: evt.target as Element,
                asideCurshion: 5,
                bottomCurshion: 10,
                topCurshion: 10,
                date: selectedDate,
            }
        );
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
        const months = getMonthDataOfYear(displayYear);
        return (
            <div className="calbody-content-yearLayout-container">
                <div className="calbody-content-yearLayout-container__months">
                    {months.map((monthData, index) => {
                        const header = (
                            <CustomizeHeader>{`${index + 1}`}</CustomizeHeader>
                        );
                        return (
                            <DatePicker
                                isPopover={false}
                                format="YYYY/MM/DD"
                                key={`yearLayout-month-${displayYear}-${index}`}
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

export default connect(mapStateToProps)(YearLayout);
