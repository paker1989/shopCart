import * as React from 'react';
import { connect } from 'react-redux';

import { DatePicker } from '../../../../../../_packages_/components/datePicker';
import { getMonthDataOfYear } from '../../../../utils/timeUtils';
import {
    isSameDay,
    getFirstDayOfMonth,
} from '../../../../../../_packages_/components/datePicker/common/util';
import CalEventPresenterManager from '../../../common/calEventPresenterManager';
import Position from '../../../common/position';
import CalEventDefiner from '../../../common/calEventDefiner';
import { getDateRange } from '../../../../utils/timeRangeHelper';
import { getPath } from '../../../../utils/routeHelper';
import { CalendarNS } from '../../../../utils/types';
import * as layoutActionCreator from '../../../../store/action/layoutAction';

import './yearLayout.scss';
import { withRouter } from 'react-router';

export interface IYearLayoutProps {
    displayYear?: number;
    locale?: CalendarNS.TLocales;
    definerCalEvtSignal?: boolean;
    history?: any;
    currentDate?: Date;
    updatePresenter?: any;
    dayEvtPresenterOptions?: any;
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
    dayEvtPresenterOptions: state.layoutReducers.dayEvtPresenterOptions,
});

const mapDispatchToProps = dispatcher => ({
    updatePresenter: (
        show: boolean,
        initOptions: CalendarNS.ICalEventPresenterProps
    ) =>
        dispatcher(
            layoutActionCreator.updateDayEvtPresenterOptions(show, initOptions)
        ),
});

class YearLayout extends React.Component<IYearLayoutProps, any> {
    private currentPopId: string;
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        // calEventPresenter.destroyPresenter(this.currentPopId);
        this.props.updatePresenter(false, {});
    }

    componentDidUpdate(prevProps: IYearLayoutProps) {
        if (prevProps.displayYear !== this.props.displayYear) {
            // calEventPresenter.destroyPresenter(this.currentPopId);
            this.props.updatePresenter(false, {});
        }
        if (
            prevProps.definerCalEvtSignal === true &&
            this.props.definerCalEvtSignal === false
        ) {
            // this.cancelPop();
            this.props.updatePresenter(false, {});
            CalEventDefiner.destroyDefiner(this.currentPopId);
        } else if (
            prevProps.definerCalEvtSignal === false &&
            this.props.definerCalEvtSignal === true
        ) {
            // this.cancelPop();
            CalEventDefiner.destroyDefiner(this.currentPopId);
            const dateToUse =
                new Date().getFullYear() === this.props.displayYear
                    ? new Date()
                    : getFirstDayOfMonth(this.props.displayYear, 1);
            const timeRange: CalendarNS.ITimeRangeFormat = getDateRange(
                dateToUse,
                dateToUse
            );

            this.props.updatePresenter(true, {
                timeRange,
                positionner: Position.autoCentral,
                dragPopNode: null,
                bottomCurshion: 50,
            });
            // this.currentPopId = CalEventDefiner.initEventDefiner(
            //     this.props.locale,
            //     {
            //         timeRange,
            //         positionner: CalEventDefiner.Position.autoCentral,
            //         dragPopNode: null,
            //         bottomCurshion: 50,
            //     }
            // );
        }
    }

    handleDateClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        const {
            locale,
            history,
            dayEvtPresenterOptions,
            updatePresenter,
        } = this.props;

        if (dayEvtPresenterOptions.show) {
            const date = dayEvtPresenterOptions.options.date;

            if (isSameDay(date, selectedDate)) {
                console.log('same day,return');
                return;
            }
        }

        console.log('update presenter');
        updatePresenter(true, {
            // dragPopNode: evt.target as Element,
            asideCurshion: 5,
            bottomCurshion: 10,
            topCurshion: 10,
            date: selectedDate,
            id: CalEventPresenterManager.getId()
        });

        // this.currentPopId = calEventPresenter.initPresenter(
        //     locale,
        //     DayEvtPresenter,
        //     {
        //         dragPopNode: evt.target as Element,
        //         asideCurshion: 5,
        //         bottomCurshion: 10,
        //         topCurshion: 10,
        //         date: selectedDate,
        //     }
        // );
        history.push(getPath(selectedDate, { layout: 'year', lang: locale }));
    };

    // cancelPop = () => {
    //     this.props.updatePresenter(false, {});
    //     CalEventDefiner.destroyDefiner(this.currentPopId);
    // };

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(YearLayout));
