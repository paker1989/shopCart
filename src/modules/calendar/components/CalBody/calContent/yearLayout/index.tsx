import * as React from 'react';
import { connect } from 'react-redux';

import DayEvtPresenter from '../../../common/calDayEvtPresenter';

import { DatePicker } from '../../../../../../_packages_/components/datePicker';
import { getMonthDataOfYear } from '../../../../utils/timeUtils';
import {
    isSameDay,
    getFirstDayOfMonth,
} from '../../../../../../_packages_/components/datePicker/common/util';
import calEventPresenter from '../../../common/calEventPresenter';
import CalEventDefiner from '../../../common/calEventDefiner';
import { getDateRange } from '../../../../utils/timeRangeHelper';
import { getPath } from '../../../../utils/routeHelper';
import { CalendarNS } from '../../../../utils/types';

import './yearLayout.scss';
import { withRouter } from 'react-router';

export interface IYearLayoutProps {
    displayYear?: number;
    locale?: CalendarNS.TLocales;
    definerCalEvtSignal?: boolean;
    history?: any;
    currentDate?: Date;
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
    currentDate: state.dateReducers.currentDate,
    displayYear: state.dateReducers.currentYear,
    definerCalEvtSignal: state.dateReducers.definerCalEvtSignal,
});

// const mapDispatchToProps = dispatcher => ({
//     toTargetDate: (targetDate: Date) => dispatcher()
// })

class YearLayout extends React.Component<IYearLayoutProps, any> {
    private currentPopId: string;
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        calEventPresenter.destroyPresenter(this.currentPopId);
    }

    componentDidUpdate(prevProps: IYearLayoutProps) {
        if (prevProps.displayYear !== this.props.displayYear) {
            calEventPresenter.destroyPresenter(this.currentPopId);
        }
        if (
            prevProps.definerCalEvtSignal === true &&
            this.props.definerCalEvtSignal === false
        ) {
            this.cancelPop();
        } else if (
            prevProps.definerCalEvtSignal === false &&
            this.props.definerCalEvtSignal === true
        ) {
            this.cancelPop();
            const dateToUse =
                new Date().getFullYear() === this.props.displayYear
                    ? new Date()
                    : getFirstDayOfMonth(this.props.displayYear, 1);
            const timeRange: CalendarNS.ITimeRangeFormat = getDateRange(
                dateToUse,
                dateToUse
            );

            this.currentPopId = CalEventDefiner.initEventDefiner(
                this.props.locale,
                {
                    timeRange,
                    positionner: CalEventDefiner.Position.autoCentral,
                    dragPopNode: null,
                    bottomCurshion: 50,
                }
            );
        }
    }

    handleDateClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        const { locale, history } = this.props;

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
                this.cancelPop();
            }
        } else {
            this.cancelPop();
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
        history.push(getPath(selectedDate, { layout: 'year', lang: locale }));
    };

    cancelPop = () => {
        calEventPresenter.destroyPresenter(this.currentPopId);
        CalEventDefiner.destroyDefiner(this.currentPopId);
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
        const { displayYear, currentDate } = this.props;
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
                                value={currentDate}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(YearLayout));
